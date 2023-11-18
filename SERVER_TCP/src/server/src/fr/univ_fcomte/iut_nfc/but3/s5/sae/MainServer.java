package fr.univ_fcomte.iut_nfc.but3.s5.sae;

import java.io.*;
import java.net.*;

class MainServer  {

    ServerSocket conn;
    Socket sock;
    int port;
    DataExchanger exchanger;
    int idThread;

    public MainServer(int port) throws IOException {
        this.port = port;
        conn = new ServerSocket(port,1);
        idThread = 1;
        exchanger = new DataExchanger(WeatherCentralServer.dotenv.get("API_URL"), WeatherCentralServer.dotenv.get("MONGO_URL"));
        // need to initializae mongo driver
        if (!exchanger.getMongoDriver().init()) {
            throw new IOException("cannot reach mongodb server and/or weatherapi database");
        }
    }

    public void mainLoop() throws IOException {

        while(true) {
            sock = conn.accept();
            Logger.println("SERVER_TCP","MainServer","new client connected", String.valueOf(idThread), Logger.Color.GREEN);

            ThreadServer t = new ThreadServer(idThread++, sock, exchanger);
            t.start();
        }
    }
}

		
