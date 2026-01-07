const express = require('express');
const router = express.Router();
const creatureController = require('../controllers/creatures.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Toutes les routes nécessitent une authentification JWT
router.use(authMiddleware);

// POST /creatures - Créer une créature
router.post('/', creatureController.createCreature);

// GET /creatures - Récupérer toutes les créatures
router.get('/', creatureController.getAllCreatures);

// GET /creatures/:id - Récupérer une créature par ID
router.get('/:id', creatureController.getCreatureById);

module.exports = router;