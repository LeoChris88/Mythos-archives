require("dotenv").config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const creatureRoutes = require('./routes/creatures.routes');
const testimonyRoutes = require('./routes/testimonies.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/creatures', creatureRoutes);
app.use('/testimonies', testimonyRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'lore-service' });
});

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connecter à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));

module.exports = app;