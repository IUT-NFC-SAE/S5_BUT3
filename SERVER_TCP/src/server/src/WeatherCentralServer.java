import io.github.cdimascio.dotenv.Dotenv;
import java.io.*;

class WeatherCentralServer {

  public static final Dotenv dotenv = Dotenv.configure().directory("../../.env").load();

  public static void main(String []args) {

    MainServer server = null;

    try {
      int port = Integer.parseInt(dotenv.get("SERVER_TCP_PORT"));
      server = new MainServer(port);
      server.mainLoop();
    }
    catch(IOException e) {
      Logger.println("SERVER_TCP","WeatherCentralServer","server down",e.getMessage(), Logger.Color.RED);
      System.exit(1);
    }
  }
}
		
