import pandas as pd 
import sys, os 
from api.models import RoutesStatic

def run():

    """Reads a csv file with column names route_id, agency_id, route_short_name and route_long_name and route_type. CSV file must 
    be in the same folder as manage.py, named routes.csv. Loops through all rows and creates an instance of 
    RoutesStatic which is saved in SQL
    
    To execute: python manage.py runscript bulk_create_routes
    
    """ 

    routes = pd.read_csv("routes.csv")  

    routes['route_type'] = routes['route_type'].apply(int)
    
    route_instances = []

    for i in range(len(routes)): 

        route_instances.append(RoutesStatic(route_id=routes['route_id'][i], agency_id=routes['agency_id'][i], 
        route_short_name=routes['route_short_name'][i], route_long_name=routes['route_long_name'][i], route_type=routes['route_type'][i])) 

    RoutesStatic.objects.bulk_create(route_instances)

    return