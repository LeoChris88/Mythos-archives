const express = require('express');
const router = express.Router();
const testimonyController = require('../controllers/testimonies.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.post('/', testimonyController.createTestimony);
router.get('/creature/:creatureId', testimonyController.getCreatureTestimonies);
router.post('/:id/validate', testimonyController.validateTestimony);
router.post('/:id/reject', testimonyController.rejectTestimony);

module.exports = router;