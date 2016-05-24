#!/usr/bin/env python
# -*- coding: utf-8 -*-
import random
from flask import Flask, jsonify

"""
This server sends out a datastream in json format containing information from our
sensors, so it has to three tasks:
    1. Retrieve data from arduino/sensors
    2. Package it up
    3. Send data for webapp to pickup

The server is build on the flask platform and is intended to be hosted on a
raspberry pi for ease of interactivity with the digital and physical world 
through it's GPIO pins.

Right now it works so that if you go to server/sensorname it returns a json
object saying if it's activated or not and follow this format
{
    sensor: name,
    status: true/false
}

"""
class Sensor(object):
    """Name and pin is important for the creating, it's web address is based
    on the name and it's physical location is based on it's pin"""
    def __init__(self, name, pin):
        self.name = name
        self.status = self.getStatus()
    
    def getStatus(self):
        #Checks the pin and returns if it's activated or not
        if random.randint(0,1) > 0:  
            return True
        else:
            return False

def setUpSensors():
    #Just initiates sensor objects, could be fancier with a better setup process
    #but for now it's hard coded 
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
    return jsonify(sensor=sensors[0].name,status=sensors[0].getStatus())

@app.route("/"+sensors[1].name+"")
def lunchbox():
    #Here we should send out what data we have
    return jsonify(sensor=sensors[1].name,status=sensors[1].getStatus())


if __name__ == '__main__':
    app.debug = True #Can not be on in production environment!
    app.run(host='0.0.0.0')
