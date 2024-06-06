package fr.univ_fcomte.iut_nfc.but3.s5.sae.drivers;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import fr.univ_fcomte.iut_nfc.but3.s5.sae.drivers.DataDriver;
import fr.univ_fcomte.iut_nfc.but3.s5.sae.models.Chipset;
import fr.univ_fcomte.iut_nfc.but3.s5.sae.models.ImageAnalysis;
import fr.univ_fcomte.iut_nfc.but3.s5.sae.models.Measure;
import fr.univ_fcomte.iut_nfc.but3.s5.sae.models.Module;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static com.mongodb.client.model.Filters.eq;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

public class MongoDataDriver implements DataDriver {

    private String mongoURL;
    private CodecProvider pojoCodecProvider;
    private CodecRegistry pojoCodecRegistry;
    private MongoClient mongoClient;
    private MongoDatabase database;
    MongoCollection<Measure> measures;
    MongoCollection<ImageAnalysis> images;
    MongoCollection<Module> modules;
    MongoCollection<Chipset> chipsets;

    public MongoDataDriver(String mongoURL) {
        this.mongoURL = mongoURL;
        pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));
    }

    public boolean init()  {
        mongoClient = MongoClients.create(mongoURL);
        try {
            database = mongoClient.getDatabase("weatherapi").withCodecRegistry(pojoCodecRegistry);
            images = database.getCollection("images", ImageAnalysis.class);
            measures = database.getCollection("measures", Measure.class);
            modules = database.getCollection("modules", Module.class);
            chipsets = database.getCollection("chipsets", Chipset.class);
        }
        catch(IllegalArgumentException e) {
            return false;
        }
        return true;
    }

    private ObjectId getModuleId(String moduleKey) {
        Module module = modules.find(eq("key",moduleKey)).first();
        if (module != null) {
            System.out.println("[SERVER_TCP:MongoDataDriver] Module: " + module.getKey() + " -> " + module.getId());

            return module.getId();
        }
        return null;
    }

    private ObjectId getChipsetId(String chipsetName) {
        Chipset chipset = chipsets.find(eq("name",chipsetName)).first();
        if (chipset != null) {
            System.out.println("[SERVER_TCP:MongoDataDriver] Chipset: " + chipset.getName() + " -> " + chipset.getId());

            return chipset.getId();
        }
        return null;
    }

    public synchronized  String autoRegisterModule(String uc, List<String> chipsets) {
        List<ObjectId> lst = new ArrayList<>();
        for(String chipset : chipsets) {
            ObjectId id = getChipsetId(chipset);
            if (id != null) {
                lst.add(id);
            }
        }
        // must generate an unique key
        UUID key = UUID.randomUUID();
        boolean stop = false;
        while(!stop) {
            ObjectId id = getModuleId(key.toString());
            if (id == null) {
                stop = true;
            }
            else {
                key = UUID.randomUUID();
            }
        }
        long nb = modules.estimatedDocumentCount()+1;
        String name = "module "+nb;
        String shortName = "mod"+nb;
        Module m = new Module(name, shortName, key.toString(), uc, lst);
        modules.insertOne(m);
        return "OK "+m.getName()+","+m.getShortName()+","+m.getKey();
    }

    public synchronized String saveMeasure(String type, String date, String value, String moduleKey) {

        ObjectId idModule = getModuleId(moduleKey);
        if (idModule == null) {
            return "ERR invalid module key";
        }
        Measure m = new Measure(type, LocalDateTime.parse(date), value, idModule);
        measures.insertOne(m);
        return "OK";
    }

    public synchronized String saveImageAnalysis(String date, String value, Double percent, String imagePath) {
        ImageAnalysis i = new ImageAnalysis(LocalDateTime.parse(date),value,percent,imagePath);
        images.insertOne(i);
        return "OK";
    }
}
