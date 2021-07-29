from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET 
from .content import *
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import *
from django.http import HttpResponseBadRequest
import json
from .models import SpotifyToken


# Create your views here. 


class AuthURL(APIView):

    def get(self, request):

        scopes = 'user-read-currently-playing  user-library-read  user-library-modify user-follow-modify streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state'

        url = Request('GET', 'https://accounts.spotify.com/authorize', 

        params={'scope':scopes, 'response_type':'code', 'redirect_uri':REDIRECT_URI, 'client_id':CLIENT_ID}).prepare().url 

        return Response({'url':url}, status=status.HTTP_200_OK) 


class IsAuthenticated(APIView): 

    def get(self, request, format=None): 

        is_authenticated = is_spotify_authenticated(request.session.session_key)   
     
        return Response({'status':is_authenticated}, status=status.HTTP_200_OK)

def spotify_callback(request):

    code = request.GET.get('code') 
    error = request.GET.get('error') 

    response = post('https://accounts.spotify.com/api/token',  data={
        'grant_type':'authorization_code',
        'code':code,
        'redirect_uri':REDIRECT_URI,
        'client_id':CLIENT_ID,
        'client_secret':CLIENT_SECRET
    }).json() 

    

    access_token = response.get('access_token') 
    token_type = response.get('token_type') 
    refresh_token = response.get('refresh_token') 
    expires_in = response.get('expires_in')
    error = response.get('error') 

    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect('frontend:') 

class CurrentSong(APIView):
    def get(self, request, format=None):

        endpoint = "player/currently-playing?market=ES"  

        response = execute_spotify_api_request(request.session.session_key, endpoint) 

        try:
            current_song = parse_current_song(response)
        except: 
            current_song = {}
        
        return Response({'current_song':current_song}, status=status.HTTP_200_OK) 

class GetAccessToken(APIView):

    def get(self, request):

        try:
            is_spotify_authenticated(request.session.session_key)   
            access_token =  get_user_tokens(request.session.session_key).access_token  
           
            return Response({'access_token':access_token}, status=status.HTTP_200_OK)
        except: 
            import traceback
            traceback.print_exc()
            return HttpResponseBadRequest(json.dumps({'error':"Spotify not authenticated"})) 


class GetPodcastEpisodes(APIView):

    def get(self, request):  

        """Returns to the requester the episodes of a podcast"""

        show_id = request.GET['id']

        access_token = get_user_tokens(request.session.session_key).access_token

        episodes = get_podcast_episodes(show_id, access_token) 

        return Response({'episodes':episodes}, status=status.HTTP_200_OK) 

class GetPodcasts(APIView): 
    """Return to the requester each podcast - it's id, a name and a photo"""

    def get(self, request):
        podcasts = []
        access_token = get_user_tokens(request.session.session_key).access_token

        for showid in podcast_show_ids:
            podcast_details = get_podcast_details(showid, access_token)  
            podcasts.append(podcast_details) 

        return Response({'podcasts':podcasts}, status=status.HTTP_200_OK)  

class PauseSong(APIView):
    """Pauses whatever song is playing on this user's spotify. Takes no arguments"""
    def get(self, request):

        is_spotify_authenticated(request.session.session_key) 

        execute_spotify_api_request(request.session.session_key, "player/pause", put_= True) 

        return Response({'success':True}, status=status.HTTP_200_OK)  













        



