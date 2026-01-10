const mongoose = require('mongoose');

const testimonySchema = new mongoose.Schema({
  authorId: {
  type: Number,
  required: true
  },
  creatureId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Creature',
  required: true
  },
  description: {
    type: String,
    required: true
  },
  validated: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Testimony', testimonySchema);