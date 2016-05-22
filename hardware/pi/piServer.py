#!/usr/bin/env python
# -*- coding: utf-8 -*-
import random
from flask import Flask, Response, jsonify

"""
This server sends out a datastream in json format contaning information from our
sensors, so it has to three tasks:
    1. Retrive data from arduino/sensors
    2. Package it up
    3. Send data for webapp to pickup

It uses the included lib simplejson, but if it dose not exist on the target
platform so is the older lib json used to maintain compability

Data should be formated like this for ease of use later on:
    data = [
        {'title': 'foo', 'message': 'bar', (...)},
        {'title': 'baz', 'message': 'qux', (...)},
        ...
    ]

data =[{'title': 'Hello World', 'body': "You´re big blue and wonderfull"}]
json.dump(data, open('demo_data.json', 'w'))
sensors: {
   umbrella: false,
   lunchbox: false
}

right now it works so that if you go to server/sensorname it returns a json
object saying if it's activated or not

"""
class Sensor(object):
    """docstring for Sensor"""
    def __init__(self, name, pin):
        self.name = name
        self.status = self.status()
    
    def status(self):
        #Checks the pin and returns if it's activated or not
        if random.randint(0,1) > 0:  
            return True
        else:
            return False

def setUpSensors():
    sensors = []
    sensors.append(Sensor('Umbrella', 10))
    sensors.append(Sensor('Lunchbox', 10))
    return sensors

sensors = setUpSensors()
app = Flask("SensorServer")

@app.route("/")
def index():
    #should not be anything here? maybe raise and error code in the browser 
    return "Data stream is located at /stream"
@app.route("/"+sensors[0].name+"")
def umbrella():
    #Here we should send out what data we have
    return jsonify(sensor=sensors[0].name,status=sensors[0].status)

@app.route("/"+sensors[1].name+"")
def lunchbox():
    #Here we should send out what data we have
    return jsonify(sensor=sensors[1].name,status=sensors[1].status)


if __name__ == '__main__':
    app.run(host='0.0.0.0')
