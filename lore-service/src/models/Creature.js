const mongoose = require('mongoose');

const creatureSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    origin: { type: String, default: 'Inconnu' },
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Creature', creatureSchema);