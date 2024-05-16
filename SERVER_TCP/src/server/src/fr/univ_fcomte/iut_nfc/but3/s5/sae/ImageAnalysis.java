package fr.univ_fcomte.iut_nfc.but3.s5.sae;

import org.bson.types.*;

import java.time.LocalDateTime;
import java.util.List;

public class ImageAnalysis {

    private ObjectId id;
    private LocalDateTime date;
    private String value;
    private Double percent;

    public ImageAnalysis() {}

    public ImageAnalysis(LocalDateTime date, String value, Double percent) {
        this.date = date;
        this.value = value;
        this.percent = percent;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Double getPercent() {
        return percent;
    }

    public void setPercent(Double percent) {
        this.percent = percent;
    }

    public String toString() {
        return id+" "+date+" "+value+" "+percent;
    }
}
