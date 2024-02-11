const express = require("express");
const app = express();
const port =3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
    res.send("Bonjour");
});

app.get("/route1", (req, res) => {
    res.send("sbeh ennour :) ");
});

app.get("/somme", (req, res) => {
    
    const x = parseFloat(req.body.x);
    const y = parseFloat(req.body.y);
    if (!isNaN(x) && !isNaN(y)) {
        const s= x+y;
        res.status(200).send(`La somme de ${x} et ${y} veut ${s}`);
    }else
    {
        res.status(404).send(" Veuillez entrer des nombres");
    }
    
});

app.get("/route2", (req, res) => {
    const nom = req.body.nom;
    res.send("sbeh ennour :) "+nom);
});


app.listen(3000, () => {
    console.log(`Serveur demarré http:localhost:${port}`);
});