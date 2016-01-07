import psycopg2
import serial
import io
import time
import sys
from local_variables import plantDataUsername, plantDataPassword
USERNAME = plantDataUsername
PASSWORD = plantDataPassword

ser = serial.Serial('/dev/ttyACM0', 9600)
conn = psycopg2.connect(database="plantdata", user=USERNAME, password=PASSWORD, host="127.0.0.1", port="5432")
cur = conn.cursor();

cur.execute("SELECT auto, humidity FROM schedule WHERE id = 1")
soil = cur.fetchone()
print soil;
if soil[0] == True:
    while True:
        serial_line = ser.readline()
        if serial_line.find(',') != -1:
            data = serial_line.rstrip('\n').split(',')
            if len(data) == 6:
                print len(data)
                print soil[1]
                print data[1]
                print data[5]
                a = int(data[5])
                try:
                    float(value)
                    return dataFloat = True
                except ValueError:
                    return dataFloat = False

                if a < soil[1] and data == True and float(data[1]) < 2:
                    print 'watering'
                    execfile('pumpStart.py')
                    print a;
                else:
                    print a;
                    print 'Stopped'
                    execfile('pumpStop.py')
                    break

print 'Operation done successfully'
ser.close();
conn.close();
sys.exit();
