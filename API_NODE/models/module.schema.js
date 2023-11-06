const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ModuleSchema = new Schema ({
    name: { type: String, required: true},          //module1
    shortname: { type: String, required: true},     //mod1/mod2
    key: {type: String, required: true},            //key of the module (esp +chipset)
    uc: { type: String, required: true},            // the type of µC within
    chipsets: [{type: Schema.Types.ObjectId, required: true, ref: 'Chipset'}],
},{versionKey: false})

module.exports = ModuleSchema;
