import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(11, GPIO.OUT)

try:
    GPIO.output(pin, GPIO.high)
except KeyboardInterrupt:
    print "\n Ending"
except:
    print "Eorror occurred with setting GPIO pin to high"
finally:
    GPIO.cleanup()
