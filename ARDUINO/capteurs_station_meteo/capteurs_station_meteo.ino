#include <WiFi.h>
#include <WiFiClient.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

// Bibliothèques des capteurs
#include <BME280I2C.h>
#include <Wire.h>
//#include <BH1750.h>       // Capteur de luminosité BH1750
//#include <RainSensor.h>   // Capteur de pluie
//#include <AnalogSensor.h> // Capteur de vent analogique

#define SERIAL_BAUD 115200

const char* ssid = "Maxime";
const char* password = "maxime90100";
const char* serverIP = "192.168.25.17"; // Adresse IP réelle du server car 127.0.0.1 = localhost de la carte elle-même
const int serverPort = 12345;
const String id = "1";                  // ID du microcontrôleur
String key = "";                        // key du module (initialisée lors de la connexion au server)

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

BME280I2C bme;
//BH1750 lightSensor; // Capteur de luminosité
//RainSensor rainSensor; // Capteur de pluie
//AnalogSensor windSensor(A0); // Capteur de vent sur la broche A0

int luminSensorPin = 34;

WiFiClient client;

void setup() {
  Serial.begin(SERIAL_BAUD);
  initSensors();
  connectToWifi(ssid,password);
}

void loop() {
  if (!client.connected()) {
    connectToServer();
  } else {

    // Mesures de la luminosité
    int rawValue = analogRead(luminSensorPin);
    float voltage = rawValue *  ((3.3 / 4095) * 1000);
    float resistance = 10000 * (voltage / (3300.0 - voltage));

    // Mesures du BME280
    float temp(NAN), hum(NAN), pres(NAN);
    BME280::TempUnit tempUnit(BME280::TempUnit_Celsius);
    BME280::PresUnit presUnit(BME280::PresUnit_Pa);
    bme.read(pres, temp, hum, tempUnit, presUnit);
  
    // Mise à jour de l'heure
    timeClient.update();
    
    storeMeasure("TEMPERATURE",String(temp));
    storeMeasure("HUMIDITE",String(hum));
    storeMeasure("PRESSION",String(pres));
    storeMeasure("LIGHT",String(unsigned(resistance)));
    delay(5000);
  }
}

void initSensors(){
  Wire.begin(18, 23);

  while (!bme.begin()) {
    Serial.println("Could not find BME280 sensor!");
    delay(1000);
  }

  switch (bme.chipModel()) {
    case BME280::ChipModel_BME280:
      Serial.println("Found BME280 sensor! Success.");
      break;
    case BME280::ChipModel_BMP280:
      Serial.println("Found BMP280 sensor! No Humidity available.");
      break;
    default:
      Serial.println("Found UNKNOWN sensor! Error!");
  }

  //lightSensor.begin();
  //rainSensor.begin();
}

void connectToWifi(const char* ssid, const char* password) {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi !");
}

void connectToServer() {
  Serial.print("Connecting to server ...");
  if (client.connect(serverIP, serverPort)) {
    Serial.println("\nConnected to server !");
    client.println(id); // Envoyer l'ID du microcontrôleur
    registerUc();
  } else {
    Serial.print(".");
  }
}

void registerUc() {
  String uc = "ESP32";
  String chipsets = "BME280 KY-018 RainSensor";
  String requestName = "AUTOREGISTER";
  String request = requestName + " " + uc + " " + chipsets;
  String response = sendRequest(request);
  if (response.startsWith("OK")) {
    int lastCommaIndex = response.lastIndexOf(',');
    key = response.substring(lastCommaIndex + 1);
  }
}

void storeMeasure(String measureType, String value) {
  String date = "0"; //timeClient.getFormattedTime();
  String request = String("STOREMEASURE") + " " + measureType + " " + date + " " + value + " " + key;
  sendRequest(request);
}


String sendRequest(String request) {
  // Send data
  Serial.println("Server Request: " + request);
  client.println(request);

  // Wait for server response
  while (!client.available()) {
    delay(1);
  }

  // Receive data
  String response = "";
  while (client.available()) {
    char c = client.read();
    response += c;
  }
  Serial.println("Server Response: " + response);
  return response;
}
