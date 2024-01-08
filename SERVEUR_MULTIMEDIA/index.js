require('dotenv').config();
const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: './images/' });

const app = express();
const port = process.env.PORT;

app.post('/upload', upload.single('photo'), (req, res) => {
    console.log(req.file);
    res.send('Image téléchargée avec succès.');
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
