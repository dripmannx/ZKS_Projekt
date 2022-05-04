#include <SPI.h>
#include <MFRC522.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <Servo.h>
#define SS_PIN 53
#define RST_PIN 9
int read_int = 0;
unsigned long  current_timestamp = 0;
unsigned long  auth_timestamp = 0;
bool auth = false;
int movement_sensor = 10;
int movementState = 0;
int speaker = 11;
int reset_timer = 0;
bool reset_lcd = false;
Servo servoblau;
MFRC522 mfrc522(SS_PIN, RST_PIN);
LiquidCrystal_I2C lcd(0x27, 16, 2);


void setup() {
  pinMode(speaker, OUTPUT);
  pinMode(movement_sensor, INPUT);
  servoblau.attach(8);
  SPI.begin();
  mfrc522.PCD_Init();
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();
  Serial.setTimeout(0.5);
  lcd.setCursor(0, 0);
  lcd.print("Waiting ...");
}

void loop() {
  movementState = digitalRead(movement_sensor);
  int read_int = 0;
  long code = 0;

  if (movementState == HIGH && auth == false) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("AAAALAAAARMMMM!!11!");
    lcd.setCursor(0, 1);
    lcd.print("Staff needed");
    digitalWrite(speaker, HIGH);
    delay(1000);
    digitalWrite(speaker, LOW);
    reset_timer = 0;
    reset_lcd = false;
    delay(500);
  }
  if (millis() - reset_timer > 3000 && reset_lcd == true) {
    reset_timer = 0;
    reset_lcd = false;
    lcd.clear(); 
    lcd.setCursor(0, 0);
    lcd.print("Waiting ...");
    delay(500);
  }
  if (millis() - auth_timestamp > 10000 && auth == true) {
    servoblau.write(0);
    auth = false;
    reset_timer = millis();
    reset_lcd = true;
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Not Authorized");
    lcd.setCursor(0, 1);
    lcd.print("Anymore!");
    delay(500);

  }

  if ( ! mfrc522.PICC_IsNewCardPresent())
  {
    return;
  }

  if ( ! mfrc522.PICC_ReadCardSerial())
  {
    return;
  }



  for (byte i = 0; i < mfrc522.uid.size; i++)
  {
    code = ((code + mfrc522.uid.uidByte[i]) * 10);
  }
  Serial.println(code);
  delay(500);

  while (!Serial.available());
  read_int = Serial.readString().toInt();
  if ( read_int == 1 or read_int == 2) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Welcome");
    if (auth == false) {
      servoblau.write(180);
    }
    reset_timer = 0;
    reset_lcd = false;
    read_int = 0;
    auth_timestamp = millis();
    auth = true;
    delay(500);
  }
  else {
    reset_timer = millis();
    reset_lcd = true;
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Not Authorized!");
    if (auth == true) {
      servoblau.write(0);
    }
    auth = false;
    auth_timestamp = 0;
    read_int = 0;
    delay(500);
  }
}
