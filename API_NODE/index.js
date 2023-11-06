const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const weatherapiRouter = require('./routes/weatherapi.route'); // Imports routes

const path = require('path');
const fs = require('fs');
const http = require('http');

const result = require('dotenv').config();
if (result.error) {
  throw result.error
}


const mongoose = require('mongoose');
let dev_db_url = 'mongodb://127.0.0.1:27017/weatherapi';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
//mongoose.set('debug',true);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', () => { console.error.bind(console, 'MongoDB connection error:')});


// get the Right model to initialize Rights collection if it is empty
const DbInint = require('./db.init');
DbInint.initBdD()

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/weatherapi', weatherapiRouter);

app.use((req,res,next) => {
  res.status(404).send({error:1, status: 404, data: 'route d\'accès à l\'API invalide'})
})

const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT, () =>
  console.log(`weatherapi started on port ${process.env.PORT}!`)
);