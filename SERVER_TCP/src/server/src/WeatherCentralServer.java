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
      System.out.println("server down: "+e.getMessage());
      System.exit(1);
    }
  }
}
		
