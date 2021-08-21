import pandas as pd 
import sys, os 
from api.models import CalendarDatesStatic

def run():

    """Reads a csv file with column names service_id, date, exception_type. CSV file must 
    be in the same folder as manage.py, named calendar_dates.csv. Loops through all rows and creates an instance of 
    CalendarDatesStatic which is saved in SQL
    
    To execute: python manage.py runscript bulk_create_calendar 
    
    """  

    calendar_dates = pd.read_csv("calendar_dates.csv")  

    calendar_dates['exception_type'] = calendar_dates['exception_type'].apply(int)
    
    calendar_dates_instances = []

    for i in range(len(calendar_dates)): 

        calendar_dates_instances.append(CalendarDatesStatic(service_id=calendar_dates['service_id'][i], 
        date=calendar_dates['date'][i], exception_type=calendar_dates['exception_type'][i])) 

    CalendarDatesStatic.objects.bulk_create(calendar_dates_instances)

    return

