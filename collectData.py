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

def createRecords(data):
    print piId;
    cur.execute("INSERT INTO light (idpi, ir, lux, visible) VALUES ('%s', '%s', '%s', '%s')" % \
        (piId, data[1], data[3], data[2])
    )
    cur.execute("INSERT INTO air(idpi, airtemp, airhumidity) VALUES ('%s', '%s', '%s')" % \
        (piId, data[5], data[4])
    )
    cur.execute("INSERT INTO soil(idpi, soilhumidity) VALUES ('%s', '%s')" %\
        (piId, data[6])
    )
    conn.commit();
    print "Records created successfully"

while True:
    serial_line = ser.readline()
    if serial_line.find(',') == -1:
        print serial_line
    else:
        piId = 'WaterIoT'
        data = serial_line.rstrip('\n').split(',')
        if data.__len__() > 5:
            fillButton = data[0]
            irNow = data[1]
            visibleNow = data[2]
            luxNow = data[3]
            airhumidityNow = data[4]
            airtempNow = data[5]
            soilhumidityNow = data[6]
            createRecords(data)
            break
        print data

cur.execute("SELECT id, my_date, idpi, ir, lux, visible FROM light")
rows = cur.fetchall()
for row in rows:
   print "ID = ", row[0]
   print "date = ", row[1]
   print "idpi = ", row[2]
   print "ir = ", row[3]
   print "lux = ", row[4]
   print "visible = ", row[5], "\n"

print "Operation done successfully"
ser.close();
conn.close();
sys.exit();
