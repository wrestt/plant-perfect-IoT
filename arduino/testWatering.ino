#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_TSL2591.h"
#include "DHT.h"

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

void configure(void) {
  lcd.init();
  lcd.home();
  lcd.begin(20, 4);
  lcd.createChar(0, newChar);
}

void basicLcdPrint(void) {
  lcd.setCursor (0,0);
  lcd.print("Lux: " + String(500));
    if(luxLight < 10000){lcd.print(" ");};
    if(luxLight < 1000){lcd.print("  ");};
    if(luxLight <  100){lcd.print("   ");};
    if(luxLight <   10){lcd.print("   ");};
  lcd.setCursor(0, 1);
  lcd.print("Air Temp: " + String(68));
  lcd.write(byte(0));
  lcd.print("F");
    if(fahrenheit < 100){lcd.print("   ");};
  lcd.setCursor(0,2);
  lcd.print("Air Humidity: ");
  lcd.print(String(28.00) + "%");
  lcd.setCursor(0,3);
  lcd.print("Soil Humidity: ");
  lcd.print(String(soilHumidity) + "%");
    if(soilHumidity <  100){lcd.print("  ");};
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
  configure();
}


void loop(void) {

  basicLcdPrint();
  delay(1000);
  lcd.Backlight();
  delay(1000);
  wateringLcdPrint();
  delay(1000);
  lcd.noBacklight();
  delay(1000);
  basicLcdPrint();
  delay(1000);
  lcd.Backlight();
  delay(1000);
  lowWaterLcdPrint();
  delay(1000);
  lcd.noBacklight();
  delay(1000);
}
