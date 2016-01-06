import RPi.GPIO as GPIO            # import RPi.GPIO module
from time import sleep             # lets us have a delay
GPIO.setmode(GPIO.BCM)             # choose BCM or BOARD
GPIO.setup(24, GPIO.OUT)           # set GPIO24 as an output

try:
    while True:
        GPIO.output(24, 1)         # set GPIO24 to 1/GPIO.HIGH/True
        sleep(5)                 # wait half a second
        GPIO.output(24, 0)         # set GPIO24 to 0/GPIO.LOW/False
        sleep(5)                 # wait half a second

except KeyboardInterrupt:          # trap a CTRL+C keyboard interrupt
    GPIO.cleanup()                 # resets all GPIO ports used by this program




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
