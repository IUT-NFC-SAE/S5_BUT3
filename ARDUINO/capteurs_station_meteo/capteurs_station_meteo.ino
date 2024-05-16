#include <WiFi.h>
#include <WiFiClient.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <SPIFFS.h>
#include <ESP.h>

// Bibliothèques des capteurs
#include <BME280I2C.h>
#include <Wire.h>

#define SERIAL_BAUD 115200

const char* ssid = "Maxime";                // Nom WiFi
const char* password = "maxime90100";       // Mot de passe WiFi
const char* serverIP = "192.168.125.17";    // Adresse IP réelle du server car 127.0.0.1 = localhost de la carte elle-même
const int serverPort = 12345;               // Port du server
const int requestTimeoutResponse = 10000;   // Temps maximal d'attente de reponse du server
const int delayBetweenMeasures = 60000;     // Temps d'attente entre chaque mesure
String key = "";                            // key du module (initialisée lors de la connexion au server)

const int photoresistorPin = 35;

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");
WiFiClient client;
BME280I2C bme;

void setup() {
  Serial.begin(SERIAL_BAUD);

  // Initialisation de la mémoire flash
  if (!SPIFFS.begin(true)) {
    Serial.println("Erreur lors de l'initialisation de SPIFFS. Tentative de formatage.");
    SPIFFS.format();  // Formate la mémoire flash
    if (!SPIFFS.begin(true)) {
        Serial.println("Impossible de formater SPIFFS.");
        return;
    }
  } else {
    Serial.println("Initialisation de SPIFFS réussie !");
  }

  initSensors();
  connectToWifi(ssid,password);
  connectToServer(serverIP,serverPort);
  key = readDataFromFlashMemory("key");
}

void loop() {
  if (WiFi.status() != WL_CONNECTED ) {
    connectToWifi(ssid,password);
  } else if(!client.connected()) {
    connectToServer(serverIP,serverPort);
  } else if(key == "") {
    registerUc();
  } else {

    // Mesures du BME280
    float temp(NAN), hum(NAN), pres(NAN);
    BME280::TempUnit tempUnit(BME280::TempUnit_Celsius);
    BME280::PresUnit presUnit(BME280::PresUnit_Pa);
    bme.read(pres, temp, hum, tempUnit, presUnit);

    // Mesure de Ky018
    int brightnessValue = analogRead(photoresistorPin);
  
    // Mise à jour de l'heure
    timeClient.update();
    String date = getFormattedDateTime();
    
    storeMeasure("temperature",String(temp),date);
    storeMeasure("humidity",String(hum),date);
    storeMeasure("pressure",String(pres),date);
    storeMeasure("brightness",String(brightnessValue),date);
    delay(delayBetweenMeasures);
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

void connectToServer(const char* ip, const int port) {
  Serial.print("Connecting to server ...");
  while(!client.connect(ip, port)) {
   Serial.print(".");
  }
  Serial.println("\nConnected to server !");
  //client.println(id); // Envoyer l'ID du microcontrôleur
}

void registerUc() {
  String uc = "ESP32";
  String chipsets = "bme280 ky018";
  String requestName = "AUTOREGISTER";
  String request = requestName + " " + uc + " " + chipsets;
  String response = sendRequest(request);
  if (response.startsWith("OK")) {
    int lastCommaIndex = response.lastIndexOf(',');
    key = response.substring(lastCommaIndex + 1);
    saveDataInFlashMemory("key", key);
  }
}

void storeMeasure(String measureType, String value, String date) {
  String request = String("STOREMEASURE") + " " + measureType + " " + date + " " + value + " " + key;
  sendRequest(request);
}

String sendRequest(String request) {
  // Send data
  Serial.println("Server Request: " + request);
  client.println(request);

  // Wait for server response
  unsigned long startTime = millis();
  while (!client.available()) {
    // Check for timeout
    if (millis() - startTime > requestTimeoutResponse) {
      Serial.println("Timeout reached. No response from the server.");
      return "";
    }
    delay(1);
  }

  // Receive data
  String response = "";
  while (client.available()) {
    char c = client.read();
    response += c;
  }
  Serial.println("Server Response: " + response);

  response.trim();
  if (response == String("clé de module invalide") || response == String("module key is invalid")){
    Serial.println("Le module n'existe plus dans la bdd, tentative de reconnexion ...");
    SPIFFS.format();
    ESP.restart();
  }
  return response;
}

void saveDataInFlashMemory(const String &key, const String &data) {
    File file = SPIFFS.open("/data.txt", "a+");
    if (!file) {
        Serial.println("Erreur lors de l'ouverture du fichier dans la mémoire flash");
        return;
    }

    file.println(key + "=" + data);
    file.close();

    Serial.println("Données enregistrées avec succès");
}

String readDataFromFlashMemory(const String &key) {
    File file = SPIFFS.open("/data.txt", "r");
    if (!file) {
        Serial.println("Erreur lors de l'ouverture du fichier dans la mémoire flash");
        return "";
    }

    while (file.available()) {
        String line = file.readStringUntil('\n');
        if (line.startsWith(key + "=")) {
            file.close();
            return line.substring(key.length() + 1);
        }
    }

    file.close();
    return "";
}

String getFormattedDateTime() {
  // Get the current time
  time_t rawTime = timeClient.getEpochTime();
  struct tm *timeinfo;
  timeinfo = localtime(&rawTime);

  // Create a formatted string
  char formattedTime[20]; // "YYYY-MM-DDTHH:mm:ss"
  sprintf(formattedTime, "%04d-%02d-%02dT%02d:%02d:%02d",
          timeinfo->tm_year + 1900, timeinfo->tm_mon + 1, timeinfo->tm_mday,
          (timeinfo->tm_hour + 2) % 24, timeinfo->tm_min, timeinfo->tm_sec); // +2 = offset de 2h

  return String(formattedTime);
}
