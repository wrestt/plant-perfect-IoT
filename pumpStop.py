import RPi.GPIO as GPIO            # import RPi.GPIO module
from time import sleep             # lets us have a delay
GPIO.setmode(GPIO.BCM)             # choose BCM or BOARD
GPIO.setup(24, GPIO.OUT)           # set GPIO24 as an output


try:
    GPIO.output(24, 0)
    GPIO.cleanup()
    print "low"
except KeyboardInterrupt:
    print "\n Ending"
except:
    print "Error occurred with setting GPIO pin to low"
