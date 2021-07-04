from django.urls import path, include
from api.views import *


urlpatterns = [
    path('getroute/', GetRoute.as_view()),
    path('signup/', SignUp.as_view()),
    path('login/', Login.as_view()),
    path('usercredentials/', UserCredentials.as_view())
]