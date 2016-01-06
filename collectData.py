import psycopg2
import serial
import io
import time
import sys
import pumpStart
import pumpStop
from local_variables import plantDataUsername, plantDataPassword
USERNAME = plantDataUsername
PASSWORD = plantDataPassword

ser = serial.Serial('/dev/ttyACM0', 9600)
conn = psycopg2.connect(database="plantdata", user=USERNAME, password=PASSWORD, host="127.0.0.1", port="5432")
cur = conn.cursor();

print "Opened database successfully"

def createPiRecords(piName):
    try:
        cur.execute("INSERT INTO pi (name) VALUES ('%s')" % (piName))
        print "Pi records created successfully"
    except:
        print "Pi Record already exists"
    conn.commit();

def createWaterRecords(piId, data):
    cur.execute("INSERT INTO water (pi_id, watering, available ) VALUES ('%s', '%s', '%s')" % \
        (piId, data[0], data[1])
    )
    conn.commit();
    print "Water records created successfully"

def createLightRecords(piId, data):
    cur.execute("INSERT INTO light (pi_id, ir, lux, visible) VALUES ('%s', '%s', '%s', '%s')" % \
        (piId, data[2], data[3], data[4])
    )
    conn.commit();
    print "Light records created successfully"

def createSoilRecords(piId, data):
    cur.execute("INSERT INTO soil(pi_id, humidity) VALUES ('%s', '%s')" %\
        (piId, data[5])
    )
    conn.commit();
    print "Soil records created successfully"

def createAirRecords(piId, data):
    cur.execute("INSERT INTO air(pi_id, temp, humidity) VALUES ('%s', '%s', '%s')" % \
        (piId, data[6], data[7])
    )
    conn.commit();
    print "Air records created successfully"

while True:
    serial_line = ser.readline()
    if serial_line.find(',') == -1:
        print serial_line
    else:
        piId = 1
        piName = "WaterIoT"
        data = serial_line.rstrip('\n').split(',')
        createPiRecords(piName);
        if data.__len__() > 6:
            createWaterRecords(piId, data)
            createLightRecords(piId, data)
            createSoilRecords(piId, data)
            createAirRecords(piId, data)
            break
        else:
            createWaterRecords(piId, data)
            createLightRecords(piId, data)
            createSoilRecords(piId, data)
        print data

cur.execute("SELECT auto, humidity FROM schedule WHERE id = 1")
row = cur.fetchone()
print row;
if row[0] == True:
    while True:
        serial_line = ser.readline()
        if serial_line.find(',') != -1:
            data = serial_line.rstrip('\n').split(',')
            print row[1]
            a = int(data[5])
            if a < row[1]:
                print 'watering'
                python pumpStart.py
                print a;
            else:
                print a;
                python pumpStop.py
                break
        else:
            python pumpStop.py
            break

print "Operation done successfully"
ser.close();
conn.close();
sys.exit();
