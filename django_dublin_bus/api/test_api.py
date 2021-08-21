from django.contrib.auth import models
from django.test import TestCase 
from api.views import get_stop_id, generate_stop_pair, get_path, get_weather_forecast_dublin, get_models_array, get_time_params
import unittest
from api.models import BusStationsStatic
import os
import datetime
import sklearn

class TestJourneyPlanning(TestCase):

    def test_correct_route_id_retrieved_easy(self): 

        stop_name =  "Foxrock Grove, Stop 2020" 
        route_name="46a"
        stop_lat = 53.27715627821375
        stop_long = -6.1665477147262875 

        stop_id = get_stop_id(stop_name, stop_lat, stop_long, route_name) 

        self.assertEqual(stop_id, "2020") 

    def test_correct_route_id_retrieved_hard(self):

        stop_name = "Foxrock Church"
        route_name="46a"
        stop_lat = 53.2739549356955
        stop_long = -6.1750856792255

        new_station = BusStationsStatic(stop_id="8250DB002017", stop_name="Foxrock Church, stop 2017", stop_lat=53.2741965449207, stop_long=-6.1750154065620) 
        new_station.save() 

        new_station = BusStationsStatic(stop_id="8250DB002060", stop_name="Foxrock Church, stop 2060", stop_lat=53.2739549356955, stop_long=-6.1750856792255) 
        new_station.save() 

        stop_id = get_stop_id(stop_name, stop_lat, stop_long, route_name) 

        self.assertEqual(stop_id, "2060")  

    def test_correct_path_generated(self):

        start_stop = "35" 

        end_stop = "261"  

        dir1 = "/Users/brianryan/Documents/CollegeWork/summer/Dublin-Bus-App-Team9/django_dublin_bus/api/models/11/dir1"

        dir1_pairs = list(map(lambda x: generate_stop_pair(x), os.listdir(dir1)))  

        valid_path, path_route = get_path(start_stop, dir1_pairs, end_stop) 

        self.assertEqual(path_route, [('35', '36'), ('36', '37'), ('37', '38'), ('38', '39'), ('39', '40'), ('40', '41'), ('41', '42'), ('42', '43'), ('43', '44'), ('44', '7603'), ('7603', '45'), ('45', '46'), ('46', '47'), ('47', '48'), ('48', '49'), ('49', '51'), ('51', '52'), ('52', '261')])



class TestWeather(unittest.TestCase):

    def test_weather_current(self):  

        weather_forecast = get_weather_forecast_dublin(datetime.datetime.now())

        with self.subTest():
            self.assertEqual(len(weather_forecast), 4) 
        
        with self.subTest():
            self.assertEqual(type(weather_forecast[0]), float)

    
    def test_weather_forecast_3day(self):

        weather_forecast = get_weather_forecast_dublin(datetime.datetime.now()+datetime.timedelta(days=3))

        with self.subTest():
            self.assertEqual(len(weather_forecast), 4) 
        
        with self.subTest():
            self.assertEqual(type(weather_forecast[0]), float)


    def test_weather_forecast_2week(self):

        weather_forecast = get_weather_forecast_dublin(datetime.datetime.now()+datetime.timedelta(days=14))

        with self.subTest():
            self.assertEqual(len(weather_forecast), 4) 
        
        with self.subTest():
            self.assertEqual(type(weather_forecast[0]), float) 


class TestJourneyPrediction(unittest.TestCase):

    def test_model_lookup(self): 

        path_route = [('35', '36'), ('36', '37'), ('37', '38'), ('38', '39'), ('39', '40'), ('40', '41'), ('41', '42'), ('42', '43'), ('43', '44'), ('44', '7603'), ('7603', '45'), ('45', '46'), ('46', '47'), ('47', '48'), ('48', '49'), ('49', '51'), ('51', '52'), ('52', '261')] 

        dir_name="/Users/brianryan/Documents/CollegeWork/summer/Dublin-Bus-App-Team9/django_dublin_bus/api/models/11/dir1"  

        models_array = get_models_array(path_route, dir_name)   

        with self.subTest():
            self.assertEqual(len(models_array), len(path_route)) 

        with self.subTest():

            self.assertEqual(sklearn.linear_model._base.LinearRegression, type(models_array[0])) 


    def test_model_inputs(self):  

        month, weekday, hour = get_time_params(datetime.datetime.today()) 

        temp, humidity, windspeed, precipitation = get_weather_forecast_dublin(datetime.datetime.now())  

        full_input_data = [[month, weekday, hour, temp, humidity, windspeed, precipitation]]  

        path_route = [('35', '36'), ('36', '37'), ('37', '38'), ('38', '39'), ('39', '40'), ('40', '41'), ('41', '42'), ('42', '43'), ('43', '44'), ('44', '7603'), ('7603', '45'), ('45', '46'), ('46', '47'), ('47', '48'), ('48', '49'), ('49', '51'), ('51', '52'), ('52', '261')] 

        dir_name="/Users/brianryan/Documents/CollegeWork/summer/Dublin-Bus-App-Team9/django_dublin_bus/api/models/11/dir1"  

        models_array = get_models_array(path_route, dir_name)  

        model = models_array[0]  


        try:
            predicted_time = model.predict(full_input_data)[0]  
            successful = True 
        except:
            successful = False 

        self.assertEqual(successful, True) 


    def test_model_prediction(self):

        month, weekday, hour = get_time_params(datetime.datetime.today()) 

        temp, humidity, windspeed, precipitation = get_weather_forecast_dublin(datetime.datetime.now())  

        full_input_data = [[month, weekday, hour, temp, humidity, windspeed, precipitation]]  

        path_route = [('35', '36'), ('36', '37'), ('37', '38'), ('38', '39'), ('39', '40'), ('40', '41'), ('41', '42'), ('42', '43'), ('43', '44'), ('44', '7603'), ('7603', '45'), ('45', '46'), ('46', '47'), ('47', '48'), ('48', '49'), ('49', '51'), ('51', '52'), ('52', '261')] 

        dir_name="/Users/brianryan/Documents/CollegeWork/summer/Dublin-Bus-App-Team9/django_dublin_bus/api/models/11/dir1"  

        models_array = get_models_array(path_route, dir_name)   


        total_time = 0 

        for model in models_array:

            total_time += model.predict(full_input_data)[0] 

        minutes = total_time//60 

        diff = abs(20-minutes) 

        self.assertGreaterEqual(7, diff)





        



        









       

          
  








