const express = require('express');
const router = express.Router();
const creatureController = require('../controllers/creatures.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.post('/', creatureController.createCreature);

router.get('/', creatureController.getAllCreatures);

router.get('/:id', creatureController.getCreatureById);

module.exports = router;