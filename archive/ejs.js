const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Définir le moteur de stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier de destination pour les fichiers téléchargés
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Initialiser multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de taille de fichier à 5 Mo
});

app.get('/ejs', (req, res) => {
  res.render('index', { message: 'Hello from EJS!' });
});

app.get('/form', (req, res) => {
  res.render('form');
});

// Traitement du formulaire
app.post('/submit', upload.single('avatar'), (req, res) => {
  const username = req.body.username;
  const avatar = req.file;  // Utilisez req.file au lieu de req.files
  // Logique de traitement
  if (!avatar) {
    return res.status(400).send('Aucun fichier n\'a été téléchargé.');
  }

  res.send(`Username: ${username}, Avatar: ${avatar.filename}, Extension: ${path.extname(avatar.originalname)}`);
});

app.listen(port, () => {
  console.log(`Serveur démarré http://localhost:${port}`);
});
