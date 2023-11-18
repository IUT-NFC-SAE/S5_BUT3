package fr.univ_fcomte.iut_nfc.but3.s5.sae;
class DataExchanger {

	private DataDriver httpDriver;
	private DataDriver mongoDriver;

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
