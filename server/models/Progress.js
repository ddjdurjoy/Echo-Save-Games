const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  data: {
    type: Object,
    default: {}
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a compound index to ensure a user can only have one progress record per game
ProgressSchema.index({ user: 1, game: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);