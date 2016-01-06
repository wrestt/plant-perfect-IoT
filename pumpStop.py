import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(8, GPIO.OUT)

try:
    GPIO.output(8, GPIO.low)
    return "low"
except KeyboardInterrupt:
    print "\n Ending"
except:
    print "Error occurred with setting GPIO pin to low"
finally:
    GPIO.cleanup()
