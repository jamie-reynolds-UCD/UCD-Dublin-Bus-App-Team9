from django.urls import path, include
from api.views import *


urlpatterns = [
    path('getroute/', GetRoute.as_view()),
]