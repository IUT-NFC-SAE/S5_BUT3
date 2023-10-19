const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MeasureSchema = new Schema({
    type: {type: String, required: true},                   //type of measure like "température, taux d'humidité etc" (same as "caps")
    date: {type: Date, required: true, default: Date.now},  //instant t of the measured value
    value: {type: Number, required: true},                  //numeric value
    module: {type: Schema.Types.ObjectId, ref: 'Module'},   //module id owner of the measure
    chipset: {type: Schema.Types.ObjectId, ref: 'Chipset'}, //chipset id owner of the measure
},{versionKey: false});

module.exports = mongoose.model("Measure", MeasureSchema);