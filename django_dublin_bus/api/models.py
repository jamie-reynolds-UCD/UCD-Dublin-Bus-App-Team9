from django.db import models


class BusStationsStatic(models.Model):

    stop_id = models.CharField(max_length=15, primary_key=True) 
    stop_name = models.CharField(max_length=150) 
    stop_lat = models.DecimalField(max_digits=17, decimal_places=13) 
    stop_long = models.DecimalField(max_digits=17, decimal_places=13) 


