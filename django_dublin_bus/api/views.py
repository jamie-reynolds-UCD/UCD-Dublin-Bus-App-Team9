from django.views import View 
import googlemaps 
import datetime
from django.http import HttpResponse, HttpResponseBadRequest
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from api.models import SavedLocations, BusStationsStatic
from api.serializers import *
from django.conf import settings
import os
import pickle
import sklearn
import pytz
import requests
from math import radians, cos, sin, asin, sqrt, floor
from functools import reduce
from operator import or_
from django.db.models import Q
from operator import or_


gmaps = googlemaps.Client(key='AIzaSyBdUcgbXHzxHB_UbYZmd7R2R6XaEO078WA')

# Create your views here.  

def generate_stop_pair(model_name): 

    from_stop = model_name[model_name.find("_")+1:model_name.rfind("_TO_")]
    to_stop = model_name[model_name.rfind("_")+1:len(model_name)-4] 

    return (from_stop, to_stop)  

def get_path(from_stop, pairs, final_target):   


    """Takes the from stop number, all pairs of stops along the route, and the final target stop. Return 
    True, *path* if a path to the final target exists. otherwise returns False, []"""
    for i in range(len(pairs)): 
        #if this is the stop we want then the next stop is the second value in this pair
        if pairs[i][0]==from_stop: 
            next_stop = pairs[i][1] 
            if next_stop==final_target:
                return True, [(from_stop, next_stop)]
            else:
                valid, path = get_path(next_stop, pairs, final_target) 
                if valid==False:
                    return valid, [] 
                else:
                    path.insert(0, (from_stop, next_stop)) 
                    return valid, path
    return False, [] 


def get_models_array(path_route, models_directory):  

   

    models = []

    for step in path_route:
        try:
            model_name = "FROM_{0}_TO_{1}.sav".format(step[0], step[1])
            file_path = os.path.join(models_directory, model_name)  

            with open(file_path, 'rb') as f:
                model = pickle.load(f) 
            models.append(model)  
        except:
            import traceback
            traceback.print_exc()

    return models


def get_time_params(timestamp): 
    dt = datetime.datetime.fromtimestamp(timestamp, pytz.timezone("Europe/Dublin")) 
    return float(dt.month), float(dt.weekday()), float(dt.hour)

def get_weather_forecast_dublin(timestamp):  

   
    current_endpoint = "http://pro.openweathermap.org/data/2.5/weather?q=Dublin,ie&APPID=98310ef86bbb250277915291623ed079&units=metric"  
    forecast_endpoint_hourly= "http://pro.openweathermap.org/data/2.5/forecast/hourly?q=Dublin,ie&APPID=98310ef86bbb250277915291623ed079&units=metric"  
    forecast_endpoint_daily = "http://pro.openweathermap.org/data/2.5/forecast/daily?q=Dublin,ie&APPID=98310ef86bbb250277915291623ed079&units=metric"  

    response = requests.get(current_endpoint)  

    data = response.json()
    


    temperature = data['main']['temp'] 
    humidity = data['main']['humidity'] 
    windspeed = data['wind']['speed']
    precipitation = data.get('rain', {}).get('1h', 0) + data.get('snow', {}).get('1h', 0)  


    
    return float(temperature), float(humidity), float(windspeed), float(precipitation)

    
def get_predicted_journey_time(departure_stop, arrival_stop, route_name, timestamp):

    print("The departure stop is {0}".format(departure_stop)) 
    print("The arrival stop is {0}".format(arrival_stop)) 
    print("The route name is {0}".format(route_name))  
    print("The timestamp is {0}".format(timestamp))  


    #list all routes in the models directory
    all_dirs = os.listdir(settings.MODELS_DIR)   

    route_name_found = False 

    #if the route name is in the models directory set route name found to true
    if route_name in all_dirs:
        route_name_found = True 

    #if the route name found is false then return None since there will be no model for this stop to stop pair
    if route_name_found==False: 
        print("Route name not found")
        return None 

    print("Route name found")

    #create the path to the models for this route
    model_dir = os.path.join(settings.MODELS_DIR, route_name) 

    #get the paths to the dir1 and dir2 models
    dir1 = os.path.join(model_dir, "dir1") 
    dir2 = os.path.join(model_dir, "dir2")   


    #turns the file names into tuples such as (103, 793) to represent a trip from stop 103 to 793
    dir1_pairs = list(map(lambda x: generate_stop_pair(x), os.listdir(dir1)))
    dir2_pairs = list(map(lambda x: generate_stop_pair(x), os.listdir(dir2)))  
   
    #checks if dir1 has a valid path from the departure stop to the arrival stop 
    path_directory = "dir1"
    valid_path, path_route = get_path(departure_stop, dir1_pairs, arrival_stop)      

    if valid_path==False:  
        path_directory="dir2"
        #if there was no valid path using di1 then check dir2
        valid_path, path_route = get_path(departure_stop, dir2_pairs, arrival_stop)  

    #if no valid path is found return None
    if valid_path==False:
        print("No valid path")
      
        return None 

    #if we are at this point we know that 
    #the variable path_directory will tell us if this trip is on dir 1 or dir 2
    #we will have an array of the path to get from *from stop* to *to stop* 
    #now we need to read in all of the models corresponding to tuples in the path_route variable 

    models_directory = dir1 if path_directory=="dir1" else dir2 

    models_array = get_models_array(path_route, models_directory)  


    #the timestamp adjust will be used to update the journey time for each stop-stop pair
    timestampadjust = 0 

    #the weather details will remain constant
    temp, humidity, windspeed, precipitation = get_weather_forecast_dublin(timestamp)  

    predicted_times = []

    for model in models_array:
        month, weekday, hour = get_time_params(timestamp + timestampadjust) 
        full_input_data = [[month, weekday, hour, temp, humidity, windspeed, precipitation]]  
        predicted_time = model.predict(full_input_data)[0] 
        timestamp += timestampadjust 
        predicted_times.append(predicted_time)  

    return int(floor(sum(predicted_times)/60))

   
def parse_step(step):
    """Helper function - Parses a 'step' from within the directions response""" 
    #these steps are common to both walking and taking the bus
    parsed_step = {} 
    parsed_step['distance'] = step['distance']['text'] 
    parsed_step['duration'] = step['duration']['text']
    parsed_step['travel_mode'] = step['travel_mode'] 

    first_comma = step['html_instructions'].find(",")  

    if first_comma==-1:
        parsed_step['short_instructions'] = step['html_instructions'] 
    else:
        parsed_step['short_instructions'] = step['html_instructions'][:first_comma] 


    if parsed_step['short_instructions'][:4]=='Walk':
        parsed_step['short_instructions'] = 'Walk' 
    
    if parsed_step['short_instructions'][:3]=='Bus':
        parsed_step['short_instructions'] = 'Bus'  

    parsed_step['short_instructions'] = parsed_step['short_instructions'] + " " + parsed_step['duration']



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


def haversine(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians 
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula 
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    r = 6371 # Radius of earth in kilometers. Use 3956 for miles
    return c * r

def get_closest_station_on_route(route_name, lat, long): 


    try: 

        model_dir = os.path.join(settings.MODELS_DIR, route_name)  
        model_dir = os.path.join(model_dir, "dir1") 

        all_pairs = os.listdir(model_dir) 


        all_stops = []

        for pair in all_pairs: 
            from_stop = pair[pair.find("_")+1:pair.rfind("_TO_")]
            to_stop = pair[pair.rfind("_")+1:len(pair)-4] 

            all_stops.append(from_stop) 
            all_stops.append(to_stop)  


        all_stops = list(map(lambda x: "stop {0}".format(x), all_stops)) 

        query_parts = []

        for stop in all_stops:
            query_parts.append(Q(**{'stop_name__iendswith':stop})) 
        

        query = reduce(or_, query_parts) 

        all_stations = BusStationsStatic.objects.filter(query) 

        closest_station_name, closest_distance = None, 9999999999 

        for station in all_stations:
            stop_lat = station.stop_lat 
            stop_long = station.stop_long 

            distance = haversine(long, lat, stop_long, stop_lat) 

            if distance<closest_distance:
                closest_station_name = station.stop_name 
                closest_distance = distance  


        if closest_distance<0.05:
            return closest_station_name 
        
        return None
    
    except:
        pass






def get_stop_id(stop_name, lat, long, route_name):
    """Given a stop name, returns the stop id from the BusStationsStatic table."""     

    if stop_name.rfind(" ")==-1:
        return None 

    stop_number = stop_name[stop_name.rfind(" ")+1:] 

    try:
        #if you can convert this number to an integer then return that since we have a stop number
        int(stop_number)  
        return stop_number
    except:
        pass 

    stations = BusStationsStatic.objects.filter(stop_name__istartswith=stop_name) 

    if stations.count()==0:  

        station_name = get_closest_station_on_route(route_name, lat, long) 

        if station_name==None:
            return None 

        return station_name[station_name.rfind(" ")+1:]
        
    serialised_stations = [] 

    for station in stations:
        serialised_stations.append({'stop_name':station.stop_name, 'stop_lat':station.stop_lat, 'stop_long':station.stop_long, 'distance':haversine(station.stop_long, station.stop_lat, long, lat)})   

    serialised_stations.sort(key=lambda x: x['distance']) 

    closest_stop = serialised_stations[0]['stop_name']  

    try:
        stop_number = closest_stop[closest_stop.rfind(" ")+1:]  
        return str(stop_number) 
    except:
        return None 

def generate_wait_departure_string(arrival_details, departure_details):  

    departure_time = departure_details['text'] 

    return "Departure: {0}".format(departure_time) 




def parse_directions(response):
    """Helper function - Parse the full directions response"""

    directions = response[0]['legs'][0]  

   

    direction_steps = directions['steps'] 

    parsed_steps = [] 

    i = 0
    for step in direction_steps: 

        parsed_steps.append(parse_step(step)) 

        if parsed_steps[-1]['travel_mode']=='WALKING': 
            try:
                end = direction_steps[i+1]['transit_details']['departure_stop']['name'] 
                parsed_steps[-1]['end_name'] = end
            except:
                pass 

        if parsed_steps[-1]['travel_mode']=='TRANSIT':
            try: 
               
                end = direction_steps[i]['transit_details']['arrival_stop']['name'] 
                parsed_steps[-1]['end_name'] = end 
                parsed_steps[-1]['departure_stop_id'] = get_stop_id(parsed_steps[-1]['departure_name'], parsed_steps[-1]['departure_location']['lat'], parsed_steps[-1]['departure_location']['lng'], parsed_steps[-1]['route_name'])
                parsed_steps[-1]['arrival_stop_id'] = get_stop_id(parsed_steps[-1]['arrival_name'], parsed_steps[-1]['arrival_location']['lat'], parsed_steps[-1]['arrival_location']['lng'], parsed_steps[-1]['route_name'])    
                parsed_steps[-1]['departure_time'] = generate_wait_departure_string(direction_steps[i]['transit_details']['arrival_time'], direction_steps[i]['transit_details']['departure_time']) 


                timestamp = direction_steps[i]['transit_details']['departure_time']['value']  


                try:
                    parsed_steps[-1]['predicted_journey_time'] = get_predicted_journey_time(parsed_steps[-1]['departure_stop_id'],parsed_steps[-1]['arrival_stop_id'], parsed_steps[-1]['route_name'], timestamp) 
                except:
                    import traceback 
                    traceback.print_exc() 
                    parsed_steps[-1]['predicted_journey_time'] = None
            except:
                import traceback
                traceback.print_exc()
        i += 1 



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

        origin_string = request.GET.get('origin_string', None) 

        destination_string = request.GET.get('destination_string', None)

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

            origin = directions_result[0]['legs'][0]['start_address'] 
            if origin.find(",")!=-1:
                origin = origin[:origin.find(",")] 
            else:
                pass 

            destination = directions_result[0]['legs'][0]['end_address'] 
            if destination.find(",")!=-1:
                destination = destination[:destination.find(",")] 
            else:
                pass  
            
            try:
                trip_departure = directions_result[0]['legs'][0]['departure_time']['text']
                trip_arrival = directions_result[0]['legs'][0]['arrival_time']['text'] 
            except:
                trip_departure=None 
                trip_arrival=None

            parsed_directions.insert(0, {'origin':origin, 'time':trip_departure}) 
            parsed_directions.append({'destination':destination, 'time':trip_arrival})

            #return to client
            return HttpResponse(json.dumps({'route':parsed_directions, 'route_bounds':route_bounds})) 
        except: 
            import traceback
            traceback.print_exc()
     
            return HttpResponseBadRequest(json.dumps({'error':'Could not find a valid route.'})) 



class UserCredentials(View):

    """Returns whether or not the client is logged in, and what their user id is (if logged in)""" 

    def get(self, request):

        loggedin = request.user.is_authenticated 

        if loggedin:
            userid = request.user.id 
            username = User.objects.get(id=userid).username
        else:
            userid = None  
            username = None

        return HttpResponse(json.dumps({'loggedin':loggedin, 'userid':userid, 'username':username}))

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

@method_decorator(csrf_exempt, name='dispatch')
class SaveLocation(View):

    def post(self, request):

        body = json.loads(request.body) 

        full_address = body.get("full_address") 

        location_name = body.get("location_name")  

        user_id = request.user.id 

        new_location = SavedLocations(full_address=full_address, location_name=location_name, user_id=user_id) 

        new_location.save() 

        return HttpResponse(json.dumps({'success':True})) 

@method_decorator(csrf_exempt, name='dispatch')
class DeleteLocation(View):

    def post(self, request):
        body = json.loads(request.body) 
        id = body['id'] 
        SavedLocations.objects.get(id=id).delete() 
        return HttpResponse(json.dumps({'success':True})) 


@method_decorator(csrf_exempt, name='dispatch')
class Logout(View): 

    def post(self, request):
        logout(request) 
        return HttpResponse(json.dumps({'success':True}))    

class UserLocations(View):

    def get(self, request):

        if request.user.is_authenticated==False:
            return HttpResponseBadRequest(json.dumps({'error':'Invalid login credentials'}))   

        #get the query set of all locations saved by this user
        saved_locations = SavedLocations.objects.filter(user_id = request.user.id)  

        serialized_locations = [serialize_saved_location(x) for x in saved_locations] 

        return HttpResponse(json.dumps({'locations':serialized_locations})) 






        

         



















