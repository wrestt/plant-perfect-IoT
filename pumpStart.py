import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(11, GPIO.OUT)

try:
    GPIO.output(pin, GPIO.high)
    return "high"
except KeyboardInterrupt:
    return "Error"
    print "\n Stopped by Keyboard"
except:
    return "Error"
    print "Error occurred with setting GPIO pin to high"
finally:
    GPIO.cleanup()
