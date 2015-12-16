import psycopg2
import serial
import io
import time
import sys
from local_variables import plantDataUsername, plantDataPassword
USERNAME = plantDataUsername
PASSWORD = plantDataPassword

ser = serial.Serial('/dev/tty.usbmodem1411', 9600)
conn = psycopg2.connect(database="plantdata", user=USERNAME, password=PASSWORD, host="127.0.0.1", port="5432")
cur = conn.cursor();

print "Opened database successfully"

def createPiRecords(piId):
    try:
        cur.execute("INSERT INTO pi (idpi) VALUES ('%s')" % (piId))
        print "Pi records created successfully"
    except:
        print "Pi Record already exists"
    conn.commit();

def createWaterRecords(piId, data):
    cur.execute("INSERT INTO water (idpi, watering, available ) VALUES ('%s', '%s', '%s')" % \
        (piId, data[0], data[1])
    )
    conn.commit();
    print "Water records created successfully"

def createLightRecords(piId, data):
    cur.execute("INSERT INTO light (idpi, ir, lux, visible) VALUES ('%s', '%s', '%s', '%s')" % \
        (piId, data[2], data[3], data[4])
    )
    conn.commit();
    print "Light records created successfully"

def createSoilRecords(piId, data):
    cur.execute("INSERT INTO soil(idpi, humidity) VALUES ('%s', '%s')" %\
        (piId, data[5])
    )
    conn.commit();
    print "Soil records created successfully"

def createAirRecords(piId, data):
    cur.execute("INSERT INTO air(idpi, temp, humidity) VALUES ('%s', '%s', '%s')" % \
        (piId, data[6], data[7])
    )
    conn.commit();
    print "Air records created successfully"

while True:
    serial_line = ser.readline()
    if serial_line.find(',') == -1:
        print serial_line
    else:
        piId = 'WaterIoT'
        data = serial_line.rstrip('\n').split(',')
        createPiRecords(piId);
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


cur.execute("SELECT id, created_at, idpi, watering, available FROM water")
rows = cur.fetchall()
for row in rows:
    print "ID = ", row[0]
    print "date = ", row[1]
    print "idpi = ", row[2]
    print "watering = ", row[3]
    print "present = ", row[4]

cur.execute("SELECT id, created_at, idpi, ir, lux, visible FROM light")
rows = cur.fetchall()
for row in rows:
   print "ID = ", row[0]
   print "date = ", row[1]
   print "idpi = ", row[2]
   print "ir = ", row[3]
   print "lux = ", row[4]
   print "visible = ", row[5], "\n"

cur.execute("SELECT id, created_at, idpi, humidity FROM soil")
rows = cur.fetchall()
for row in rows:
   print "ID = ", row[0]
   print "date = ", row[1]
   print "idpi = ", row[2]
   print "soil = ", row[3], "\n"

cur.execute("SELECT id, created_at, idpi, temp, humidity FROM air")
rows = cur.fetchall()
for row in rows:
    print "ID = ", row[0]
    print "date = ", row[1]
    print "idpi = ",
    print "temp = ", row[3]
    print "humidity = ", row[4], "\n"

print "Operation done successfully"
ser.close();
conn.close();
sys.exit();
