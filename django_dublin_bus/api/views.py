from django.views import View 
import googlemaps 
import datetime
from django.http import HttpResponse, HttpResponseBadRequest
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

gmaps = googlemaps.Client(key='AIzaSyBdUcgbXHzxHB_UbYZmd7R2R6XaEO078WA')

# Create your views here.

def parse_step(step):
    """Helper function - Parses a 'step' from within the directions response"""

    #these steps are common to both walking and taking the bus
    parsed_step = {} 
    parsed_step['distance'] = step['distance']['text'] 
    parsed_step['duration'] = step['duration']['text']
    parsed_step['travel_mode'] = step['travel_mode'] 
    parsed_step['description'] = step['html_instructions'] 
    parsed_step['polyline'] = step['polyline'] 
    parsed_step['start_location'] = step['start_location'] 
    parsed_step['end_location'] = step['end_location']  

    #extra details if the step is "TRANSIT" (BUS)
    if step['travel_mode']=='TRANSIT':
        parsed_step['departure_location'] = step['transit_details']['departure_stop']['location'] 
        parsed_step['departure_name'] = step['transit_details']['departure_stop']['name'] 
        parsed_step['departure_time'] = step['transit_details']['departure_time']['text']

        parsed_step['arrival_location'] = step['transit_details']['arrival_stop']['location'] 
        parsed_step['arrival_name'] = step['transit_details']['arrival_stop']['name'] 
        parsed_step['arrival_time'] = step['transit_details']['arrival_time']['text']

        parsed_step['route_name'] = step['transit_details']['line']['short_name']
        parsed_step['vehicle_type'] = step['transit_details']['line']['vehicle']['type'] 
        parsed_step['agency'] = step['transit_details']['line']['agencies'][0]['name']
    
    return parsed_step

def parse_directions(response):
    """Helper function - Parse the full directions response"""

    directions = response[0]['legs'][0]

    direction_steps = directions['steps']

    parsed_steps = []

    for step in direction_steps:
        parsed_steps.append(parse_step(step)) 

    return parsed_steps 

def get_route_bounds(directions): 

    lats = []
    lngs = []

    for direction in directions:
        lats.append(direction['start_location']['lat'])
        lats.append(direction['end_location']['lat'])

        lngs.append(direction['start_location']['lng'])
        lngs.append(direction['end_location']['lng']) 

    bound_1 = {'lat':min(lats), 'lng':min(lngs)}
    bound_2 = {'lat':max(lats), 'lng':max(lngs)} 

    return [bound_1, bound_2]

class GetRoute(View):

    """API route which will return the route/directions given a start and an end pojnt. 
    The model will be integrated within this route on the Bus leg of the journey"""


    def get(self,request): 
        
        #get the origin and destination coordinates
        origin_coords = request.GET.get('origin_coords', None)

        dest_coords = request.GET.get('dest_coords', None) 

        time = request.GET["time"] 

        date = request.GET["date"]  

        #if either of the above or null then return a bad request code
        if origin_coords==None or dest_coords==None:
            return HttpResponseBadRequest(json.dumps({'error':'Origin and destination coordinates required.'}))


        #get and format the coordinates
        origin_coords = json.loads(origin_coords) 

        dest_coords = json.loads(dest_coords)

        start = "{0},{1}".format(origin_coords['latitude'], origin_coords['longitude']) 

        end = "{0},{1}".format(dest_coords['latitude'], dest_coords['longitude'])  

        #this will also be changed so that it is included in the get request params 


        if time=="now":
            departure_time = datetime.datetime.now() 
        else:
            departure_time = datetime.datetime.strptime("{0} {1}".format(date, time), "%Y-%m-%d %H:%M")

        #get the directions from google
        directions_result = gmaps.directions(start, end, mode="transit", departure_time=departure_time, transit_mode='bus')  

        try:
            #parse the directions  
            parsed_directions = parse_directions(directions_result)  

            route_bounds = get_route_bounds(parsed_directions)

            #return to client
            return HttpResponse(json.dumps({'route':parsed_directions, 'route_bounds':route_bounds})) 
        except:
            HttpResponseBadRequest(json.dumps({'error':'Could not find a valid route.'})) 



class UserCredentials(View):

    """Returns whether or not the client is logged in, and what their user id is (if logged in)""" 

    def get(self, request):

        loggedin = request.user.is_authenticated 

        if loggedin:
            userid = request.user.id 
        else:
            userid = None 

        return HttpResponse(json.dumps({'loggedin':loggedin, 'userid':userid}))

@method_decorator(csrf_exempt, name='dispatch')
class SignUp(View): 

    def post(self, request): 
        
        #get email, password and username from request 

        body = json.loads(request.body)
        email = body.get('email', None) 
        password = body.get('password', None) 
        username = body.get('username', None)  

        #need to check requirements (e.g. not null/password and username length etc here)
        emailerror, passworderror, usernameerror = None, None, None 
        anyerror = False
        
        if email==None:
            emailerror = "*Field is required*"  
            anyerror = True

        if password==None:
            passworderror="*Field is required*"   
            anyerror = True
        else: 
            if len(password)<8:
                passworderror="*Must be >= 8 characters*" 
                anyerror = True

        if username==None:
            usernameerror="*Field is required*" 
            anyerror=True
        else:
            if len(username)<8:
                usernameerror="*Must be >= 8 characters*"  
                anyerror = True

        try:
            username_exists = User.objects.get(username=username) 
            username_exists = True 
        except:
            username_exists = False 

        if username_exists:
            usernameerror="*Username already in use*" 
            anyerror = True 

        if anyerror:
            return HttpResponseBadRequest(json.dumps({'errors':{'emailerror':emailerror, 'passworderror':passworderror, 'usernameerror':usernameerror}})) 

        else:
            User.objects.create_user(username, email, password) 
            return HttpResponse(json.dumps({'success':True})) 


@method_decorator(csrf_exempt, name='dispatch')
class Login(View):

    def post(self, request): 
        
        body = json.loads(request.body)

        username = body.get("username", None) 

        password = body.get("password", None) 

        user = authenticate(username=username, password=password) 

        if user==None:
            return HttpResponseBadRequest(json.dumps({'error':'Invalid login credentials'})) 
        else:
            login(request, user) 

            return HttpResponse(json.dumps({'success':True}))  











