import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(11, GPIO.OUT)

try:
    GPIO.output(pin, GPIO.low)
except KeyboardInterrupt:
    print "\n Ending"
except:
    print "Eorror occurred with setting GPIO pin to low"
finally:
    GPIO.cleanup()
