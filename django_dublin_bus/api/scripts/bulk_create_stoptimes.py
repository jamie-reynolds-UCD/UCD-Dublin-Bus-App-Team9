import pandas as pd 
import sys, os 
from api.models import StopTimesStatic

def run():

    """Reads a csv file with column names trip_id, arrival_time, departure_time, stop_id,
    stop_sequence, stop_headsign, pickup_type, dropoff_type, shape_dist_travelled. CSV file must 
    be in the same folder as manage.py, named stoptimes.csv. Loops through all rows and creates an instance of 
    StopTimesStatic which is saved in SQL
    
    To execute: python manage.py runscript bulk_create_stoptimes
    
    """ 

    stoptimes = pd.read_csv("stop_times.csv")  

    stoptimes['pickup_type'] = stoptimes['pickup_type'].apply(int)
    stoptimes['drop_off_type'] = stoptimes['drop_off_type'].apply(int)
    stoptimes['stop_sequence'] = stoptimes['stop_sequence'].apply(int)
    stoptimes['shape_dist_traveled'] = stoptimes['shape_dist_traveled'].apply(float)
    
    stoptimes_instances = []

    for i in range(len(stoptimes)): 

        stoptimes_instances.append(StopTimesStatic(trip_id=stoptimes['trip_id'][i], arrival_time=stoptimes['arrival_time'][i], 
        departure_time=stoptimes['departure_time'][i], stop_id=stoptimes['stop_id'][i], stop_sequence=stoptimes['stop_sequence'][i], 
        stop_headsign=stoptimes['stop_headsign'][i], pickup_type=stoptimes['pickup_type'][i], drop_off_type=stoptimes['drop_off_type'][i],
        shape_dist_traveled=stoptimes['shape_dist_traveled'][i])) 

    #StopTimesStatic.objects.bulk_create(stoptimes_instances)

    return


 