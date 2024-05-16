import fr.univ_fcomte.iut_nfc.but3.s5.sae.Logger;

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
				Logger.print("CLIENT_TCP","MainClient","request>",null,null);
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
						requestStoreImageAnalysis(parts[1], Double.valueOf(parts[2]));
					}
					else if (parts[0].equals("quit")) {
						stop = true;
					}
				}
			}
		}
		catch(IOException e) {
			Logger.println("CLIENT_TCP","MainClient","cannot communicated with server",e.getMessage(), Logger.Color.RED);
		}
	}

	protected void requestAutoRegister(String[] params) throws IOException {

		String answer="";
		StringBuilder req = new StringBuilder("AUTOREGISTER");
		for(int i=1;i<params.length;i++) req.append(" ").append(params[i]);
		Logger.println("CLIENT_TCP","MainClient:AutoRegister","process request", String.valueOf(req), Logger.Color.CYAN);
		ps.println(req);
		answer = br.readLine();
		Logger.println("CLIENT_TCP","MainClient:AutoRegister",null,answer,answer.startsWith("ERR") ? Logger.Color.RED : Logger.Color.GREEN);
	}

	protected void requestStoreMeasure(String type, String value) throws IOException {
		String moduleKey = "2e46990d-3e85-45f8-82c8-f05eec1a1212";
		String answer="";
		String req = "STOREMEASURE "+type+" "+ LocalDateTime.now() +" "+value+" "+moduleKey;
		Logger.println("CLIENT_TCP","MainClient:StoreMeasure","process request",req,Logger.Color.CYAN);
		ps.println(req);
		answer = br.readLine();
		Logger.println("CLIENT_TCP","MainClient:StoreMeasure",null,answer,answer.startsWith("ERR") ? Logger.Color.RED : Logger.Color.GREEN);
	}

	protected void requestStoreImageAnalysis(String value, Double percent) throws IOException {
		String answer="";
		String req = "STOREIMAGEANALYSIS "+ LocalDateTime.now() +" "+value+" "+percent;
		Logger.println("CLIENT_TCP","MainClient:StoreImageAnalysis","process request",req,Logger.Color.CYAN);
		ps.println(req);
		answer = br.readLine();
		Logger.println("CLIENT_TCP","MainClient:StoreImageAnalysis",null,answer,answer.startsWith("ERR") ? Logger.Color.RED : Logger.Color.GREEN);
	}
}
		
