import RPi.GPIO as GPIO
from time import sleep
GPIO.setmode(GPIO.BCM)
GPIO.setup(8, GPIO.OUT)

try:
    GPIO.output(8, 1)
    print "high"
except KeyboardInterrupt:
    print "\n Stopped by Keyboard"
except:
    print "Error occurred with setting GPIO pin to high"
finally:
    GPIO.cleanup()
