//API Contacts
const express = require("express");
const app = express();
const port = 3000;
/* const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); */

app.use(express.json());
//app.use(bodyParser.json());

//Parametres de la cnx a la base
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/tozeur');
const db = mongoose.connection;
db.on('error', () => {
    console.log("Erreur");
});
db.once('open', () => {
    console.log("Connexion avec succees");
});

const ContactModel = require("./Models/Contact");
const contactRouter= require('./Routes/Contact');
app.use('', contactRouter);

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger-config');
// Middleware pour servir la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const jwt = require('jsonwebtoken');
// Clé secrète pour la création et la vérification des JWT
const secretKey = 'votreclésecrete'; // Utilisation d'une variable d'environnement

// Messages constants
const ERROR_MESSAGE = 'L\'authentification a échoué';
const SUCCESS_MESSAGE = 'L\'authentification a réussi';

// Middleware pour analyser le corps des requêtes au format JSON


// Middleware pour gérer l'authentification
app.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation des champs requis
    if (!username || !password) {
      throw new Error('Les champs "username" et "password" sont requis.');
    }

    // Dans un véritable cas d'utilisation, vous vérifieriez les informations d'authentification ici
    // Si l'authentification réussit, vous pouvez générer un JWT
    if (username === 'utilisateur' && password === 'motdepasse') {
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
      res.json({ token, message: SUCCESS_MESSAGE });
    } else {
      res.status(401).json({ message: ERROR_MESSAGE });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});


// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Aucun token fourni' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token non valide' });
      } else {
        req.user = decoded; // Ajouter les informations utilisateur au objet req pour un accès facile dans les routes suivantes
        next();
      }
    });
  };


// Appliquer le middleware d'authentification à la route
app.get('/contact/lister1', authenticateToken, async (req, res) => {
    try {
      // Utiliser les informations de l'utilisateur si nécessaire
      const user = req.user;
  
      // Les traitements nécessaires pour lister les contacts
      const liste = await ContactModel.find({}).exec();
      
      console.log(liste);
      return res.status(200).json(liste);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  });  



app.listen(3000, () => {
    console.log(`Serveur demarré http:localhost:${port}`);
});