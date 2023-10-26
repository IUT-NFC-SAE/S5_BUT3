import java.io.*;
import java.net.*;
import java.time.LocalDateTime;
class MainClient  {

	BufferedReader br;
	PrintStream ps;
	Socket sock;
	BufferedReader consoleIn; // to read from keyboard

	public MainClient(String serverAddr, int port) throws IOException {

		consoleIn = new BufferedReader(new InputStreamReader(System.in));

		sock = new Socket(serverAddr,port);
		br = new BufferedReader(new InputStreamReader(sock.getInputStream()));
		ps = new PrintStream(sock.getOutputStream());
	}

	public void mainLoop() {

		String req = "";
		boolean stop = false;

		try {
			// reading requests from keyboard
			while (!stop) {
				System.out.print("WeatherClient [type request]> ");
				req = consoleIn.readLine();
				if (req == null) {
					stop = true;
				}
				else {
					String[] parts = req.split(" "); // separate req. name from params.
					if ("1".equals(parts[0])) {
						requestAutoRegister(parts);
					}
					else if ("2".equals(parts[0])) {
						requestStoreMeasure(parts[1], parts[2]);
					}
					else if ("3".equals(parts[0])) {
						requestStoreAnalysis(parts[1], parts[2]);
					}
					else if (parts[0].equals("quit")) {
						stop = true;
					}
				}
			}
		}
		catch(IOException e) {
			System.out.println("cannot communicated with server. Aborting");
		}
	}

	protected void requestAutoRegister(String[] params) throws IOException {

		String answer="";
		StringBuilder req = new StringBuilder("AUTOREGISTER");
		for(int i=1;i<params.length;i++) req.append(" ").append(params[i]);
		System.out.println(req);
		ps.println(req);
		answer = br.readLine();
		if (answer.startsWith("ERR")) {
			System.out.println("error with request auto-register:"+answer);
		}
		System.out.println(answer);
	}

	protected void requestStoreMeasure(String type, String value) throws IOException {
		String moduleKey = "2e46990d-3e85-45f8-82c8-f05eec1a1212";
		String answer="";
		String req = "STOREMEASURE "+type+" "+ LocalDateTime.now() +" "+value+" "+moduleKey;
		System.out.println(req);
		ps.println(req);
		answer = br.readLine();
		if (answer.startsWith("ERR")) {
			System.out.println("error with request store measure:"+answer);
		}
		else {
			System.out.println(answer);
		}
	}

	protected void requestStoreAnalysis(String type, String value) throws IOException {
		String answer="";
		String req = "STOREANALYSIS "+type+" "+ LocalDateTime.now() +" "+value;
		System.out.println(req);
		ps.println(req);
		answer = br.readLine();
		if (answer.startsWith("ERR")) {
			System.out.println("error with request store measure:"+answer);
		}
		else {
			System.out.println(answer);
		}
	}
}
		
