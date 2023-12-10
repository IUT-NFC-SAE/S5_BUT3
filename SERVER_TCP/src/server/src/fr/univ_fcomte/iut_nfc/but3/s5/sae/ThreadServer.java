package fr.univ_fcomte.iut_nfc.but3.s5.sae;

import java.io.*;
import java.net.*;
import java.util.ArrayList;
import java.util.List;

class ThreadServer extends Thread {

	BufferedReader br;
	PrintStream ps;
	Socket sock;
	DataExchanger exchanger;
	int idThread;

	public ThreadServer(int idThread, Socket sock, DataExchanger data) {
		this.sock = sock;
		this.idThread = idThread;
		this.exchanger = data;
	}

	public void run() {

		try {
			br = new BufferedReader(new InputStreamReader(sock.getInputStream()));
			ps = new PrintStream(sock.getOutputStream());
		}
		catch(IOException e) {
			Logger.println("SERVER_TCP","ThreadServer","Thread "+idThread+": cannot create streams",e.getMessage(), Logger.Color.RED);
			return;
		}
		requestLoop();
		Logger.println("SERVER_TCP","ThreadServer","end of thread "+idThread,null, Logger.Color.YELLOW);
	}

	public void requestLoop() {

		String req = "";
		String idReq = "";
		String[] reqParts;

		try {
			while(!"LOGOUT".equals(idReq)) {
				req = br.readLine();
				if ((req == null) || (req.isEmpty())) {
					// Do nothing
				} else {
					reqParts = req.split(" ");
					idReq = reqParts[0];

					if ("AUTOREGISTER".equals(idReq)) {
						requestAutoRegister(reqParts);
					}
					else if ("STOREMEASURE".equals(idReq)) {
						requestStoreMeasure(reqParts);
					}
					else if ("STOREANALYSIS".equals(idReq)) {
						requestStoreAnalysis(reqParts);
					}
				}
			}
			Logger.println("SERVER_TCP","ThreadServer","end of request loop",null, Logger.Color.YELLOW);
		}
		catch(IOException e) {
			Logger.println("SERVER_TCP","ThreadServer","problem with request",e.getMessage(), Logger.Color.RED);
		}
	}

	protected void requestAutoRegister(String[] params) throws IOException {
		Logger.println("SERVER_TCP","ThreadServer:AutoRegister","processing request","AUTO REGISTER", Logger.Color.CYAN);

		// remove the identifier+uc from params
		List<String> lst = new ArrayList<>();
		for(int i=2;i<params.length;i++) {
			lst.add(params[i]);
		}
		if (params.length < 3) {
			ps.println("ERR invalid number of parameters");
			return;
		}
		// (un)comment to choose direct mongo access or through the node API
		//String answer = exchanger.getMongoDriver().autoRegisterModule(params[1], lst);
		String answer = exchanger.getHttpDriver().autoRegisterModule(params[1], lst);
		Logger.println("SERVER_TCP","ThreadServer:AutoRegister","response",answer,answer.startsWith("ERR") ? Logger.Color.RED : Logger.Color.GREEN);
		ps.println(answer);
	}

	protected void requestStoreMeasure(String[] params) throws IOException {
		Logger.println("SERVER_TCP","ThreadServer:StoreMeasure","processing request","STORE MEASURE", Logger.Color.CYAN);

		if (params.length != 5) {
			ps.println("ERR invalid number of parameters");
			return;
		}
		// (un)comment to choose direct mongo access or through the node API
		//String answer = exchanger.getMongoDriver().saveMeasure(params[1], params[2], params[3], params[4]);
		String answer = exchanger.getHttpDriver().saveMeasure(params[1], params[2], params[3], params[4]);
		Logger.println("SERVER_TCP","ThreadServer:StoreMeasure","response",answer,answer.startsWith("ERR") ? Logger.Color.RED : Logger.Color.GREEN);
		ps.println(answer);
	}

	protected void requestStoreAnalysis(String[] params) throws IOException {
		Logger.println("SERVER_TCP","ThreadServer:StoreAnalysis","processing request","STORE ANALYSIS", Logger.Color.CYAN);

		if (params.length != 4) {
			ps.println("ERR invalid number of parameters");
			return;
		}
		// (un)comment to choose direct mongo access or through the node API
		String answer = exchanger.getMongoDriver().saveAnalysis(params[1], params[2], params[3]);
		//String answer = exchanger.getHttpDriver().saveAnalysis(params[1], params[2], params[3]);
		Logger.println("SERVER_TCP","ThreadServer:StoreAnalysis","response",answer,answer.startsWith("ERR") ? Logger.Color.RED : Logger.Color.GREEN);
		ps.println(answer);
	}

}

		
