const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Choisissez un port pour le serveur
app.use(bodyParser.json()); // Middleware pour analyser le corps des requêtes JSON

let wines = [];

// Modèle pour le vin (juste pour référence, pas de validation automatique)
const wineModel = {
    id: null,
    name: '',
    year: null,
    grape: '',
    country: ''
};

// Route pour obtenir la liste des vins
app.get('/wines', (req, res) => {
    res.json(wines);
});

// Route pour créer un nouveau vin
app.post('/wines', (req, res) => {
    const wine = req.body;
    wine.id = wines.length + 1; // Assigner un ID unique
    wines.push(wine);
    res.status(201).json(wine);
});

// Route pour obtenir un vin spécifique par ID
app.get('/wines/:id', (req, res) => {
    const wineId = parseInt(req.params.id, 10);
    const wine = wines.find(w => w.id === wineId);
    if (!wine) {
        return res.status(404).send(`Wine ${wineId} doesn't exist`);
    }
    res.json(wine);
});

// Route pour supprimer un vin par ID
app.delete('/wines/:id', (req, res) => {
    const wineId = parseInt(req.params.id, 10);
    wines = wines.filter(w => w.id !== wineId);
    res.status(204).send(); // Pas de contenu à retourner
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Wine API is running at http://localhost:${port}`);
});
