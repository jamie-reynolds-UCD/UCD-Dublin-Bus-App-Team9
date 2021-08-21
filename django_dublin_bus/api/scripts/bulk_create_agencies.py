import pandas as pd 
import sys, os 
from api.models import AgencyStatic

def run():

    """Reads a csv file with column names agency_id, agency_name, agency_url, agency_timezone and agency_lang. CSV file must 
    be in the same folder as manage.py, named agency.csv. Loops through all rows and creates an instance of 
    AgencyStatic which is saved in SQL
    
    To execute: python manage.py runscript bulk_create_agencies
    
    """ 

    agencies = pd.read_csv("agency.csv")  

    agency_instances = []

    for i in range(len(agencies)): 

        agency_instances.append(AgencyStatic(agency_id=agencies['agency_id'][i], agency_name=agencies['agency_name'][i], 
        agency_url=agencies['agency_url'][i], agency_timezone=agencies['agency_timezone'][i], agency_lang=agencies['agency_lang'][i]))

    AgencyStatic.objects.bulk_create(agency_instances)

    return