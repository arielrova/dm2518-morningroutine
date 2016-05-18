#!/usr/bin/env python
try:
    import simplejson as json
except:
    import json
from flask import Flask, Response

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

"""
class Sensor(object):
    """docstring for Sensor"""
    def __init__(self, name, pin):
        self.name = name
    
    def status():
        return True

def setUpSensors():
    sensors = []
    sensors.append(Sensor('Umbrella', 10))
    sensors.append(Sensor('Lunchbox', 10))
    return sensors

sensors = setUpSensors()
app = Flask(__name__)

@app.route("/"):
def index():
    #should not be anything here? maybe raise and error code in the browser 
    pass
@app.route("/stream")
def streamData():
    #Here we should send out what data we have
    def generate():
        return packageData()
    return Response(generate())

def getData(sensors):
    #Not hooked på to sensors yet so just return something is here
    rawData = {}
    for sensor in sensors:
        rawData[sensor.name] = sensor.status()
        return rawData

def packageData():
    rawData = getData()
    data = json.dumps(rawData)
    return data

def sendData():
    return formatedData

def main():
    rawDate = getData()
    data = packageData(rawData)
    sendData(data)

if __name__ == '__main__':
    app.run()
