import pandas as pd 
import sys, os 
from api.models import TripsStatic

def run():

    """Reads a csv file with column names route_id, service_id, trip_id, shape_id, trip_headsign and direction_id. CSV file must 
    be in the same folder as manage.py, named trips.csv. Loops through all rows and creates an instance of 
    TripsStatic which is saved in SQL
    
    To execute: python manage.py runscript bulk_create_trips 
    
    """ 

    trips = pd.read_csv("trips.csv")  

    trips['direction_id'] = trips['direction_id'].apply(int)
    
    trip_instances = []

    for i in range(len(trips)): 

        trip_instances.append(TripsStatic(route_id=trips['route_id'][i], service_id=trips['service_id'][i], 
        trip_id=trips['trip_id'][i], shape_id=trips['shape_id'][i], trip_headsign=trips['trip_headsign'][i], direction_id=trips['direction_id'][i])) 

    TripsStatic.objects.bulk_create(trip_instances)

    return