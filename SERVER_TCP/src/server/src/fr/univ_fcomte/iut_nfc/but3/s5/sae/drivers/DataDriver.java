package fr.univ_fcomte.iut_nfc.but3.s5.sae.drivers;

import java.util.List;

public interface DataDriver {

    // initialize the driver (if needed)
    public boolean init();
    // store a measure in the DB
    public String saveMeasure(String type, String date, String value, String moduleKey);
    // register a module from its own request
    public String autoRegisterModule(String uc, List<String> chipsets);
    // store image analysis
    public String saveImageAnalysis(String date, String value, Double percent, String param);

}
