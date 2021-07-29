from credentials import *  
import urllib.parse
import requests
import traceback
from difflib import SequenceMatcher


ACCESS_TOKEN = "BQDgdOsvSAY_iN_Wte2hGYHEBtisR4rW6p2wflxhtUs0zSN2KOpmHRUADI3MEpkE-ILRM92S59A5yQhTGqdYj4H80ILYjcfG4PXv1RBE1w1_Pf21fPUgejbHoHHkabj0qINHtdjv7s5gcWTR2QqC3NMSxJn751zWTuz0X_y2TcIEkAX0NPWoeu_mpr68AAk"




def generate_search_url_by_name(name): 
    endpoint = "https://api.spotify.com/v1/search" 
    query_dict = {'q':name, 'type':'artist'}
    query_string = urllib.parse.urlencode(query_dict)
    return "{0}?{1}".format(endpoint, query_string)   

def perform_search(search_url, name):
    response = requests.get(search_url, headers={'Authorization':"Bearer {0}".format(ACCESS_TOKEN)})  
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

def get_artist_top_tracks(artist_id):
    endpoint = "https://api.spotify.com/v1/artists/" 
    url = "{0}{1}/top-tracks?market=ES".format(endpoint, artist_id) 
    response = requests.get(url, headers={'Authorization':"Bearer {0}".format(ACCESS_TOKEN)})
    tracks = list(map(lambda x: {'name':x['name'], 'id':x['id'], 'image':x['album']['images'][-1]['url']}, data['tracks'])) 
    return tracks 

def top_tracks(artist_name):
    """Given an artist name it will find the spotify artist with the name most similar, 
    it will then retrieve the top tracks for that artist and return this as an array with each 
    object containing the song id, the name and an associated image of the album""" 

    artist = search_for_artist(artist_name)
    top_tracks = get_artist_top_tracks(artist[1]) 
    return top_tracks 

print(top_tracks('The thing about dublin'))


   








