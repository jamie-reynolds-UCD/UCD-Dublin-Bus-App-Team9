import pandas as pd 
import sys, os 
from api.models import ShapesStatic

def run():

    """Reads a csv file with column names shape_id,shape_pt_lat,shape_pt_lon,shape_pt_sequence, and shape_dist_traveled. CSV file must 
    be in the same folder as manage.py, named shapes.csv. Loops through all rows and creates an instance of 
    ShapesStatic which is saved in SQL
    
    To execute: python manage.py runscript bulk_create_shapes
    
    """ 

    shapes = pd.read_csv("shapes.csv")   

    print(shapes)

    shapes['shape_pt_lat'] = shapes['shape_pt_lat'].apply(float) 
    shapes['shape_pt_lon'] = shapes['shape_pt_lon'].apply(float)  
    shapes['shape_pt_sequence'] = shapes['shape_pt_sequence'].apply(int) 
    shapes['shape_dist_traveled'] = shapes['shape_dist_traveled'].apply(float)

    
    shape_instances = []

    for i in range(len(shapes)):  

        shape_instance = ShapesStatic(shape_id=shapes['shape_id'][i],shape_pt_lat=shapes['shape_pt_lat'][i],
        shape_pt_lon=shapes['shape_pt_lon'][i], shape_pt_sequence=shapes['shape_pt_sequence'][i], 
        shape_dist_traveled=shapes['shape_dist_traveled'][i]) 

        shape_instance.save() 
       
    #ShapesStatic.objects.bulk_create(shape_instances)

    return