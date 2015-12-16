#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_TSL2591.h"
#include "DHT.h"
#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
Adafruit_TSL2591 tsl = Adafruit_TSL2591(2591);
LiquidCrystal_I2C lcd(0x27,20,4);
byte newChar[8] = {
  B00011,
  B00011,
  B00000,
  B00000,
  B00000,
  B00000,
  B00000,
};

int buttonPin = 8;
int pumpPin = 11;
int count = 0;
int soilHumidity;
int button;
int buttonCount;
int waterPresent = true;
int screenCount;
float fahrenheit;
float humidity;
uint32_t lum;
uint16_t irLight, fullLight, luxLight, visibleLight;

void configure(void) {
  lcd.init();
  lcd.home();
  lcd.begin(20, 4);
  lcd.createChar(0, newChar);
  tsl.setGain(TSL2591_GAIN_MED);
  tsl.setTiming(TSL2591_INTEGRATIONTIME_400MS);
  pinMode(pumpPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void basicLcdPrint(void) {
  lcd.setCursor (0,0);
  lcd.print("Lux: " + String(luxLight));
  lcd.setCursor(0, 1);
  lcd.print("Air Temp: " + String(fahrenheit));
  lcd.write(byte(0));
  lcd.print("F");
  lcd.setCursor(0,2);
  lcd.print("Air Humidity: ");
  lcd.print(String(humidity) + "%");
  lcd.setCursor(0,3);
  lcd.print("Soil Humidity: ");
  lcd.print(String(soilHumidity) + "%");
}

void backlightLcd(void) {
  if(screenCount > 0) {
    lcd.backlight();
    screenCount -= 1;
  } else {
    lcd.noBacklight();
  }
}

void wateringLcdPrint(void) {
  lcd.clear();
  lcd.setCursor(6,1);
  lcd.print("Watering");
}

void lowWaterLcdPrint(void) {
  lcd.clear();
  lcd.setCursor(5,1);
  lcd.print("Low Water");
}

void setup(void) {
  Serial.begin(9600);
  if (!tsl.begin()) {
    Serial.println("No sensor found ... check your wiring?\n");
  } else {
    configure();
  }
}

void basicRead(void) {
  basicLcdPrint();
  Serial.println(String(button) + ',' + String(waterPresent) + ',' + String(irLight) + ',' + String(luxLight) + ',' + String(visibleLight) + ',' + String(soilHumidity) + '\n');
}

void advancedRead(void) {
  humidity = dht.readHumidity();
  fahrenheit = dht.readTemperature(true);
  if (isnan(humidity) || isnan(fahrenheit)) {
    Serial.println("Failed to read from DHT sensor!\n");
    return;
  } else  {
    basicLcdPrint();
    Serial.print(String(button) + ','+ String(waterPresent) + ',' + String(irLight) + ',' + String(luxLight) + ',' + String(visibleLight) + ',' + String(soilHumidity) + ',' + String(fahrenheit) + ',' + String(humidity) + '\n');
  }
}

void loop(void) {
  soilHumidity = word(analogRead(A0));
  button = digitalRead(buttonPin);
  Serial.println(button);
  lum = tsl.getFullLuminosity();
  irLight = lum >> 16;
  fullLight = lum & 0xFFFF;
  visibleLight = fullLight - irLight;
  luxLight = tsl.calculateLux(fullLight, irLight);
  backlightLcd();
  if (button == 1) {
    buttonCount +=1
    lcd.backlight();
    screenCount = 20;
  } else {
    digitalWrite(pumpPin, LOW);
    buttonCount = 0;
    if (count < 10) {
      basicRead();
      count += 1;
    } else {
      count = 0;
      advancedRead();
    }
  }

  if (buttonCount >= 5) {
    if (soilHumidity > 0) {
      digitalWrite(pumpPin, HIGH);
      wateringLcdPrint();
    } else {
      digitalWrite(pumpPin, LOW);
      lowWaterLcdPrint();
    }
  }
  delay(50);
}
