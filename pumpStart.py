import RPi.GPIO as GPIO            # import RPi.GPIO module
from time import sleep             # lets us have a delay
GPIO.setmode(GPIO.BCM)             # choose BCM or BOARD
GPIO.setup(24, GPIO.OUT)           # set GPIO24 as an output

try:
    while True:
        GPIO.output(24, 1)
except KeyboardInterrupt:
    GPIO.cleanup()




# import RPi.GPIO as GPIO
# from time import sleep
# GPIO.setmode(GPIO.BCM)
# GPIO.setup(8, GPIO.OUT)
#
# try:
#     GPIO.output(8, 1)
#     print "high"
# except KeyboardInterrupt:
#     print "\n Stopped by Keyboard"
# except:
#     print "Error occurred with setting GPIO pin to high"
# finally:
#     GPIO.cleanup()
