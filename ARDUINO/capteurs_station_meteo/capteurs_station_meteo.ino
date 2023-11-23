#include <BME280I2C.h>
#include <Wire.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <HTTPClient.h>
//#include <BH1750.h> // Bibliothèque pour le capteur de luminosité BH1750
#include <ArduinoJson.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

// Trouver les capteurs corrects pour la pluie et le vent
// Visiblement, pas besoin de bibliothèque pour la pluie
//#include <RainSensor.h> // Bibliothèque pour le capteur de pluie

//#include <AnalogSensor.h> // Bibliothèque pour le capteur de vent analogique

#define SERIAL_BAUD 115200

// Changer le ssid, password, et l'adresse du serveur
const char* ssid = "iPhone 12 de H";
const char* password = "aaaaaaaa";
const char* serverIP = "127.0.0.1"; // mettre localhost
const int serverPort = 12345; // mettre le port correspondant
//const String serverURL = "/storedata.php"; // L'URL du serveur -> pas important si transfert en HTTP
const String id = "1"; // ID du microcontrôleur

// StaticJsonDocument<1000> docTemp; 
// StaticJsonDocument<1000> docHum;
// StaticJsonDocument<1000> docPress;
// StaticJsonDocument<1000> docRain; 


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

  while (!Serial) {} // Attendre

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

  // Connexion au WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
}

void loop() {


  if (!client.connected()) {
    connectToServer();
  } else {


    int rawValue = analogRead(luminSensorPin);
    float voltage = rawValue *  ((3.3 / 4095) * 1000);
    float resistance = 10000 * (voltage / (3300.0 - voltage));
  // Requete pour ajouter les modules à la bdd en TCP
  // 1 + " " + uc + " " + liste des chipsets

  //Ajout du uc

  String nameEsp32 = "ESP32";
  String uc = nameEsp32 + String(id);

  // On ajoute le BME280, RainSensor et KY-018 ... --> faire en sorte qu'il soit adaptable peu importe le type de sensor
  String chipsetList[] = {"BME280", "KY-018", "RainSensor"};


  for(int i=0; i<= sizeof(chipsetList); i++){
    String addModuleUrl = String(1) + " " + uc + " " + chipsetList[i];

    sendRequest(addModuleUrl);

    // Attendre la réponse du serveur
    String response = receiveResponse();
    Serial.println("Server Response: " + response);

    delay(1000);
  }


  // Acquisition des mesures du BME280
  float temp(NAN), hum(NAN), pres(NAN);
  BME280::TempUnit tempUnit(BME280::TempUnit_Celsius);
  BME280::PresUnit presUnit(BME280::PresUnit_Pa);
  bme.read(pres, temp, hum, tempUnit, presUnit);

  // Lecture des données du capteur de luminosité, de pluie et de vent
  //float light = lightSensor.readLightLevel();
  //bool isRain = rainSensor.isRaining();
  //float windSpeed = windSensor.readValue(); // Lire la vitesse du vent depuis le capteur

  
// Exemple requete HTTP --> visiblement on doit pas faire ça
//{
//  "type" : "TEMPERATURE",
//  "date" : "2020-05-13",
//  "value" : 5,
//  "module" : "$id",
//}

// Mise à jour de l'heure
  timeClient.update();

  // Récupération de l'heure actuelle
  //Serial.println(timeClient.getFormattedTime());

  // JsonObject doc_0_Temp = docTemp.createNestedObject();
  // doc_0_Temp["type"] = "TEMPERATURE";
  // // Pour récupérer la date, se connecter à un serveur distant et récupérer l'heure de ce serveur
  // doc_0_Temp["date"] = String(Serial.println(timeClient.getFormattedTime()));
  // doc_0_Temp["value"] = String(temp);
  // doc_0_Temp["module"] = id;

  // JsonObject doc_0_Hum = docTemp.createNestedObject();
  // doc_0_Hum["type"] = "HUMIDITE";
  // // Pour récupérer la date, se connecter à un serveur distant et récupérer l'heure de ce serveur
  // doc_0_Hum["date"] = String(Serial.println(timeClient.getFormattedTime()));
  // doc_0_Hum["value"] = String(hum);
  // doc_0_Hum["module"] = id;

  // JsonObject doc_0_Pres = docTemp.createNestedObject();
  // doc_0_Pres["type"] = "PRESSION";
  // // Pour récupérer la date, se connecter à un serveur distant et récupérer l'heure de ce serveur
  // doc_0_Pres["date"] = String(Serial.println(timeClient.getFormattedTime()));
  // doc_0_Pres["value"] = String(pres);
  // doc_0_Pres["module"] = id;

  // JsonObject doc_0_Rain = docTemp.createNestedObject();
  // doc_0_Rain["type"] = "PLUIE";
  // // Pour récupérer la date, se connecter à un serveur distant et récupérer l'heure de ce serveur
  // doc_0_Rain["date"] = String(Serial.println(timeClient.getFormattedTime()));
  // doc_0_Rain["value"] = String(isRain ? "1" : "0");
  // doc_0_Rain["module"] = id;

  // String jsonString1;
  // serializeJson(doc_0_Temp, jsonString1);
  // Serial.println(jsonString1);

  // String jsonString2;
  // serializeJson(doc_0_Hum, jsonString2);
  // Serial.println(jsonString2);

  // String jsonString3;
  // serializeJson(doc_0_Pres, jsonString3);
  // Serial.println(jsonString3);

  // String jsonString4;
  // serializeJson(doc_0_Rain, jsonString4);
  // Serial.println(jsonString4);


  // 2 pour l'ajout d'une valeur
  // 2 + " "+ type de valeur mesuree + " " + val +" " + date + " " + id module
  // temperature, humidite, pression, luminosité, pluie
  // Envoi vers le serveur TCP 


  // Construire l'URL avec les valeurs des capteurs
  //String url = "/storedata.php?temp=" + String(temp) + "&humidity=" + String(hum) + "&pressure=" + String(pres) + "&light=" + String(light) + "&rain=" + String(isRain ? "1" : "0") + "&windspeed=" + String(windSpeed);

  String request1 = String(2) + " " + "TEMPERATURE" + " " + String(temp) + " " + timeClient.getFormattedTime() + " " + id;
  String request2 = String(2) + " " + "HUMIDITE" + " " + String(hum) + " " + timeClient.getFormattedTime() + " " + id;
  String request3 = String(2) + " " + "PRESSION" + " " + String(pres) + " " + timeClient.getFormattedTime() + " " + id;
  String request4 = String(2) + " " + "LIGHT" + " " + String(unsigned(resistance)) + " " + timeClient.getFormattedTime() + " " + id;

  //String request5 = 2 + " " + "RAIN" + " " + String(isRain ? "1" : "0") + " " + String(Serial.println(timeClient.getFormattedTime())) + " " + id;



  // Effectuer la requête HTTP
  // for(int i=1; i<=5; i++){
  //   HTTPClient http;
  //   http.begin(serverIP, 80, "request".concat(i));

  //   int httpResponseCode = http.GET();

  //   if (httpResponseCode > 0) {
  //     String response = http.getString();
  //     Serial.println("HTTP Response Code: " + String(httpResponseCode));
  //     Serial.println("Server Response: " + response);
  //   } else {
  //     Serial.println("HTTP Request failed");
  //   }

  //   http.end();
  // }

  // changer avec 6 si on ajoute la rain

  String requestName = "request";
  for(int i =1; i<=5; i++){
    sendRequest(requestName + i);

    // Attendre la réponse du serveur
    String response = receiveResponse();
    Serial.println("Server Response: " + response);
    delay(1000);

  }

  }
}

void connectToServer() {
  if (client.connect(serverIP, serverPort)) {
    Serial.println("Connected to server");
    client.println(id); // Envoyer l'ID du microcontrôleur
  }
}

void sendRequest(String request) {
  client.println(request);
}

String receiveResponse() {
  String response = "";
  while (client.available()) {
    char c = client.read();
    response += c;
  }
  return response;
}
