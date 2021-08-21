import pandas as pd 
import sys, os 
from api.models import CalendarStatic

def run():

    """Reads a csv file with column names service_id, monday, tuesday, wednesday, thursday,
    friday, saturday, sunday, start_date, end_date. CSV file must 
    be in the same folder as manage.py, named calendar.csv. Loops through all rows and creates an instance of 
    CalendarStatic which is saved in SQL
    
    To execute: python manage.py runscript bulk_create_calendar 
    
    """  

    CalendarStatic.objects.all().delete()

    calendar = pd.read_csv("calendar.csv")  

    print(calendar)
    

    for day in ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']:
        calendar[day] = calendar[day].apply(lambda x: True if x=='1' or x==1 else False)
  
    
    calendar_instances = []

    for i in range(len(calendar)): 

        calendar_instances.append(CalendarStatic(service_id=calendar['service_id'][i], 
        monday=calendar['monday'][i],  tuesday=calendar['tuesday'][i], wednesday=calendar['wednesday'][i],
        thursday=calendar['thursday'][i], friday=calendar['friday'][i], saturday=calendar['saturday'][i],
        sunday = calendar['sunday'][i], start_date = calendar['start_date'][i], end_date=calendar['end_date'][i])) 




    CalendarStatic.objects.bulk_create(calendar_instances)

    return

