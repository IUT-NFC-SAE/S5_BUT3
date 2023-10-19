const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UcontrollerSchema= new Schema ({
    name: { type: String, required: true},
    key: {type: String, required: true}, // (mod1/mod2)
    uc: { type: String, required: true}, // the type of µC within
    chipsets: [{type: Schema.Types.ObjectId, required: true, ref: 'Chipset'}],
},{versionKey: false})

module.exports = mongoose.model("Ucontroller", UcontrollerSchema);
