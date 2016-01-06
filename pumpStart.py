import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(8, GPIO.OUT)

try:
    GPIO.output(pin, GPIO.high)
    print "high"
except KeyboardInterrupt:
    print "\n Stopped by Keyboard"
except:
    print "Error occurred with setting GPIO pin to high"
finally:
    GPIO.cleanup()
