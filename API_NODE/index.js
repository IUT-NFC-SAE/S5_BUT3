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

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next) => {
  res.status(404).send({error:1, status: 404, data: 'route d\'accès à l\'API invalide'})
})

app.use('/weatherapi', weatherapiRouter);


const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT, () =>
  console.log(`weatherapi started on port ${process.env.PORT}!`)
);