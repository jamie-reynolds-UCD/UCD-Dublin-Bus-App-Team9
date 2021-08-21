
import pandas as pd 
import sys, os 
from api.models import TransfersStatic

def run():

    """Reads a csv file with column names from_stop_id, to_stop_id, transfer_type, min_transfer_time. CSV file must 
    be in the same folder as manage.py, named transfers.csv. Loops through all rows and creates an instance of 
    TransfersStatic which is saved in SQL
    
    To execute: python manage.py runscript bulk_create_transfers
    
    """ 

    transfers = pd.read_csv("transfers.csv")    

    transfers = transfers.dropna(how='any')

    transfers = transfers.reset_index(drop=True)

    transfers['transfer_type'] = transfers['transfer_type'].apply(int)

    transfers['min_transfer_time'] = transfers['min_transfer_time'].apply(int)
    
    transfer_instances = []

    for i in range(len(transfers)): 

        transfer_instances.append(TransfersStatic(from_stop_id=transfers['from_stop_id'][i], to_stop_id=transfers['to_stop_id'][i],
        transfer_type=transfers['transfer_type'][i], min_transfer_time=transfers['min_transfer_time'][i]))

    TransfersStatic.objects.bulk_create(transfer_instances)

    return