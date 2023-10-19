const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    login: {type: String, required: true, maxLength:255},
    password: {type: String, maxLength:255},
    email: {type: String, maxLength:255},
    /* rights to implement */
},{versionKey: false});

module.exports = mongoose.model("User", UserSchema);