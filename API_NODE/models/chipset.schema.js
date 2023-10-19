const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChipsetSchema = new Schema({
    name: { type: String, required: true},      //name like "Capteur de température"
    description: { type: String},               //detail about the sensor "au soleil"
    links: [{ type: String}],                   //link of the chipset                   
    caps: [ {type: String, required: true} ],   //capacity of the chipset "humidity", "temperature"
},{versionKey: false});

module.exports = mongoose.model("Chipset", ChipsetSchema);