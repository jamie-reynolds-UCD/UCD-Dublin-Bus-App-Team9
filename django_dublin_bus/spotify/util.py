from datetime import timedelta
from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET 
from requests import post, put, get
import datetime
import urllib.parse
from difflib import SequenceMatcher
import requests
import traceback

BASE_URL = "https://api.spotify.com/v1/me/"

def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id) 
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None

def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):

    tokens = get_user_tokens(session_id) 
    expires_in = timezone.now() + timedelta(seconds = expires_in) 

    if tokens:
        tokens.access_token = access_token 
        tokens.expires_in = expires_in 
        tokens.token_type = token_type 
        tokens.save(update_fields=['access_token', 'expires_in', 'token_type'])  
       
    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token, refresh_token=refresh_token, 
        token_type=token_type, expires_in=expires_in)
        tokens.save() 

def is_spotify_authenticated(session_id):

    tokens = get_user_tokens(session_id)   

    if tokens:        
        expiry = tokens.expires_in   
        expiry = datetime.datetime(expiry.year, expiry.month, expiry.day, expiry.hour, expiry.minute)
  
        if expiry <= timezone.now():
            refresh_spotify_token(session_id)  
        return True
    
    return False 

def refresh_spotify_token(session_id): 
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={'grant_type':'refresh_token',
    'refresh_token':refresh_token,
    'client_id':CLIENT_ID,
    'client_secret':CLIENT_SECRET}
    ).json()   


    access_token = response.get('access_token') 
    token_type = response.get('token_type') 
    expires_in = response.get('expires_in') 
    refresh_token = response.get('refresh_token')   

    update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token) 

def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False):
    tokens = get_user_tokens(session_id)
    
    header = {'Content-Type':'application/json', 'Authorization':"Bearer " + tokens.access_token}

    if post_:
        post(BASE_URL + endpoint, headers=header) 
    
    if put_:
        put(BASE_URL + endpoint, headers=header)   


    response = get(BASE_URL + endpoint, {}, headers=header)  

    try:
        return response.json() 
    except:
        return {'Error':'Issue with request'} 

def parse_current_song(song):    

  
   
    parsed_song = {}  
    artist = song['item']['album']['artists'][0]['name']  
    image = song['item']['album']['images'][0]['url']
    name = song['item']['name']
    parsed_song['artist'] = artist  
    parsed_song['image'] = image 
    parsed_song['name'] = name 
    

    return parsed_song  


def get_podcast_episodes(podcast_id, access_token): 

    header = {'Content-Type':'application/json', 'Authorization':"Bearer " + access_token}

    endpoint = "https://api.spotify.com/v1/shows/{0}/episodes".format(podcast_id) 

    data = get(endpoint, headers=header).json()  

    return list(map(lambda x: {'id':x['id'], 'duration_ms':x['duration_ms'], 'name':x['name'], 'uri':x['uri'],'image':x['images'][-1]['url']}, data['items']))

    

def get_podcast_details(podcast_id, access_token):
    header = {'Content-Type':'application/json', 'Authorization':"Bearer " + access_token}

    endpoint = "https://api.spotify.com/v1/shows/{0}".format(podcast_id)  

    data = get(endpoint, headers=header).json()  

    return {'id':podcast_id, 'name':data['name'], 'image':data['images'][-1]['url']}


def generate_search_url_by_name(name): 
    endpoint = "https://api.spotify.com/v1/search" 
    query_dict = {'q':name, 'type':'artist'}
    query_string = urllib.parse.urlencode(query_dict)
    return "{0}?{1}".format(endpoint, query_string)   

def perform_search(search_url, name, access_token):
    response = requests.get(search_url, headers={'Authorization':"Bearer {0}".format(access_token)})  
    data = response.json() 

    try:
        artist_names_ids_similarity = list(map(lambda x: (x['name'], x['id'], SequenceMatcher(None, name, x['name']).ratio()), data['artists']['items'])) 
    except: 
        traceback.print_exc()
        return None 

    artist_names_ids_similarity.sort(key=lambda x: x[-1]) 

    return artist_names_ids_similarity[-1]

def search_for_artist(name):
    try:
        search_url = generate_search_url_by_name(name)  
        return perform_search(search_url, name) 
    except:
        return None   

def get_artist_top_tracks(artist_id, access_token):
    endpoint = "https://api.spotify.com/v1/artists/" 
    url = "{0}{1}/top-tracks?market=ES".format(endpoint, artist_id) 
    response = requests.get(url, headers={'Authorization':"Bearer {0}".format(access_token)})
    data = response.json() 

    print("TRACKS") 
    print(data['tracks'])
    tracks = list(map(lambda x: {'name':x['name'], 'id':x['id'], 'image':x['album']['images'][-1]['url']}, data['tracks'])) 
    return tracks 











    
    







