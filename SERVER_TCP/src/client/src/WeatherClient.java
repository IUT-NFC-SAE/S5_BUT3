import io.github.cdimascio.dotenv.Dotenv;
import java.io.*;

class WeatherClient {

  public static final Dotenv dotenv = Dotenv.configure().directory("../../.env").load();

  public static void main(String []args) {

    MainClient client;

    try {
      String serverAddr = dotenv.get("SERVER_TCP_IP_ADDR");
      int port = Integer.parseInt(dotenv.get("SERVER_TCP_PORT"));
      client = new MainClient(serverAddr,port);
      client.mainLoop();
    }
    catch(IOException e) {
      Logger.println("CLIENT_TCP","WeatherClient","cannot connect to server",e.getMessage(), Logger.Color.RED);
      System.exit(1);
    }
  }
}
		
