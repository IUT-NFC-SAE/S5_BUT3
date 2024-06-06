package fr.univ_fcomte.iut_nfc.but3.s5.sae.models;

import org.bson.types.*;

import java.time.LocalDateTime;

public class ImageAnalysis {

    private ObjectId id;
    private LocalDateTime date;
    private String value;
    private Double percent;
    private String image;

    public ImageAnalysis() {}

    public ImageAnalysis(LocalDateTime date, String value, Double percent, String image) {
        this.date = date;
        this.value = value;
        this.percent = percent;
        this.image = image;
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

    public String getImage() {return image;}

    public void setImage(String path) {this.image = image;}

    public String toString() {
        return id+" "+date+" "+value+" "+percent+" "+image;
    }
}
