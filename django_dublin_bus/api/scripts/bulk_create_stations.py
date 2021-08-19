import pandas as pd 
import sys, os 
from api.models import BusStationsStatic

def run():

    """Reads a csv file with column names stop_id, stop_name, stop_lat and stop_long. CSV file must 
    be in the same folder as manage.py, named stops.csv. Loops through all rows and creates an instance of 
    BusStationsStatic which is saved in SQL
    
    To execute: python manage.py runscript bulk_create_stations
    
    """ 

    stops = pd.read_csv("stops.csv") 
    
    stops['stop_lat'], stops['stop_long'] = stops['stop_lat'].apply(float), stops['stop_lon'].apply(float) 

    stop_instances = [] 

    for i in range(len(stops)): 

        stop_instances.append(BusStationsStatic(stop_id=stops['stop_id'][i], stop_name=stops['stop_name'][i], stop_lat=stops['stop_lat'][i], stop_long=stops['stop_lon'][i])) 

    BusStationsStatic.objects.bulk_create(stop_instances)

    return