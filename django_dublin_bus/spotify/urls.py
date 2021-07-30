from django.urls import path
from .views import *


urlpatterns = [ 
    path('get-auth-url/', AuthURL.as_view()),
    path('redirect/', spotify_callback),
    path('is-authenticated/', IsAuthenticated.as_view()),
    path('current-song/', CurrentSong.as_view()), 
    path('access-token/', GetAccessToken.as_view()),
    path('podcast-episodes/', GetPodcastEpisodes.as_view()),
    path('get-podcasts/', GetPodcasts.as_view()),
    path('pause-song/', PauseSong.as_view()),
    path('artist-details/', GetArtistDetails.as_view())
]
