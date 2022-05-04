import serial
import time
import mysql.connector
db = mysql.connector.connect(
host ="localhost",
user ="root",
password ="usbw",
database ="rfid_user"
)
cur = db.cursor()
arduino = serial.Serial('COM3', 9600, timeout=0.01)
run = True
access = False
codes = []   

def arduino_write(int_controll):
    arduino.write(bytes(int_controll, 'latin-1'))
    time.sleep(0.5)


while run:
    code = 0
    access_list =[]
    code = arduino.readline().decode('utf-8').rstrip()
    if code and code != 1 and code != 2 and code != 0 :
        cur.execute(f"SELECT rfid FROM user WHERE access = 'true'")
        rfid_codes = cur.fetchall()
        for codes in rfid_codes:  
            access_list= []  
            if codes[0] == code:
                access = True  
            else:
                access = False
            access_list.append(access)
        for check_compliance in access_list:
            if True in access_list:
                arduino_write('1\n')  #1 access = True
                time.sleep(0.5) 
            if True not in access_list:
                arduino_write('8\n')  #1 access = True
                time.sleep(0.5) 



