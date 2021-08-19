from django.db import models
from django.db.models.fields import IntegerField


class BusStationsStatic(models.Model): 

    """This table just contains the names and coordinates of each stop along with 
    a unique identifier"""

    stop_id = models.CharField(max_length=15, primary_key=True) 
    stop_name = models.CharField(max_length=150) 
    stop_lat = models.DecimalField(max_digits=17, decimal_places=13) 
    stop_long = models.DecimalField(max_digits=17, decimal_places=13)   


class RoutesStatic(models.Model):  

    """The Routes are essentially referring to "46A" for instance. This table does 
    not give much information. Each 'Trip' from TripStatic is part of a route, and a route 
    can have multiple trips"""

    route_id = models.CharField(max_length=15, primary_key=True) 
    agency_id = models.CharField(max_length=10) 
    route_short_name = models.CharField(max_length=15) 
    route_long_name =  models.CharField(max_length=50) 
    route_type = models.IntegerField() 

class TripsStatic(models.Model): 

    """Trips happen along a 'route'. The service_id tells us what days and 
    dates these trips operate. The shape_id is related to ShapesStatic and 
    from that we can generate an array of coordinates which trace out the shape of the trip. 

    A trip is made up of a number of stops and specific times for each stop. You can look at the 
    breakdown of a trip's stops by selecting from StopTimesStatic where trip_id=trip_id"""

    route_id = models.CharField(max_length=15) 
    service_id = models.CharField(max_length=15) 
    trip_id = models.CharField(max_length=50, primary_key=True) 
    shape_id = models.CharField(max_length=50)
    trip_headsign = models.CharField(max_length=50) 
    direction_id = models.IntegerField() 

class StopTimesStatic(models.Model): 

    """Related to trips through trip_id and gives the arrival and departure time 
    at each stop along the trip""" 

    trip_id = models.CharField(max_length=50) 
    arrival_time = models.CharField(max_length=10)  
    departure_time = models.CharField(max_length=10)  
    stop_id = models.CharField(max_length=15)   
    stop_sequence = models.IntegerField() 
    stop_headsign = models.CharField(max_length=50) 
    pickup_type = models.IntegerField()  
    drop_off_type = models.IntegerField()  
    shape_dist_traveled = models.DecimalField(max_digits=15, decimal_places=3)  

class CalendarStatic(models.Model): 

    """Associated with trips and shows boolean values for each weekday 
    indicating if the trip service is available on that day of the week for the 
    date range specified"""

    service_id = models.CharField(max_length=15)  
    monday = models.BooleanField()
    tuesday = models.BooleanField()
    wednesday = models.BooleanField()
    thursday = models.BooleanField() 
    friday = models.BooleanField()
    saturday = models.BooleanField()
    sunday = models.BooleanField() 
    start_date = models.CharField(max_length=8) 
    end_date = models.CharField(max_length=8) 

class CalendarDatesStatic(models.Model): 
    """This table contains any exceptions to the main calendar (CalendarStatic) 
    The exception_type is 1 if the service has been added for the date specified, 
    and it is 2 if the service has been removed for the date specified"""

    service_id = models.CharField(max_length=15)  
    date = models.CharField(max_length=8)  
    exception_type = models.IntegerField() 


class ShapesStatic(models.Model): 

    """This table contains the coordinates to trace out the shape of a 
    "trip" from the trips table"""

    shape_id = models.CharField(max_length=20) 
    shape_pt_lat = models.DecimalField(max_digits=17, decimal_places=13) 
    shape_pt_lon = models.DecimalField(max_digits=17, decimal_places=13) 
    shape_pt_sequence = IntegerField()
    shape_dist_traveled = models.DecimalField(max_digits=15, decimal_places=3)  

class AgencyStatic(models.Model):

    """A list of agencies (Dublin Bus, Bus Eireann etc) with unique identifiers""" 

    agency_id = models.CharField(max_length=15)  
    agency_name = models.CharField(max_length=50) 
    agency_url = models.CharField(max_length=50)  
    agency_timezone = models.CharField(max_length=50)   
    agency_lang =  models.CharField(max_length=15)  

class TransfersStatic(models.Model):

    """Table of transfers between routes - specifies the stop where the 
    transfer starts and the stop where the transfer ends as well as the 
    min time required""" 

    from_stop_id = models.CharField(max_length=15) 
    to_stop_id = models.CharField(max_length=15)  
    transfer_type = IntegerField() 
    min_transfer_time = models.IntegerField()











