package fr.univ_fcomte.iut_nfc.but3.s5.sae.drivers;

public class DataExchanger {

	private final DataDriver httpDriver;
	private final DataDriver mongoDriver;

	public DataExchanger(String apiURL, String mongoURL ) {
		httpDriver = new HttpDataDriver(apiURL);
		mongoDriver = new MongoDataDriver(mongoURL);
	}

	public DataDriver getHttpDriver() {
		return httpDriver;
	}

	public DataDriver getMongoDriver() {
		return mongoDriver;
	}
}
