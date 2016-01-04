import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(11, GPIO.OUT)

try:
    GPIO.output(pin, GPIO.low)
    return "low"
except KeyboardInterrupt:
    return "stopped pin low by keyboard"
    print "\n Ending"
except:
    return "error setting pin low"
    print "Error occurred with setting GPIO pin to low"
finally:
    GPIO.cleanup()

sys.exit();
