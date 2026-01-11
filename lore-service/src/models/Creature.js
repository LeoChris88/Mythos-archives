const mongoose = require('mongoose');

const creatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    origin: {
        type: String,
        default: 'Inconnu'
    },
    authorId: {
        type: String, 
        required: true
    },
    legendScore: {
        type: Number,
        default: 1.0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Creature', creatureSchema);