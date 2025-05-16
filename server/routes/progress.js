const express = require('express');
const Progress = require('../models/Progress');
const Game = require('../models/Game');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET api/progress
// @desc    Get all progress for current user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id })
      .populate('game', 'title category')
      .sort({ updatedAt: -1 });
    
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/progress/:gameId
// @desc    Get progress for a specific game
// @access  Private
router.get('/:gameId', auth, async (req, res) => {
  try {
    const progress = await Progress.findOne({
      user: req.user.id,
      game: req.params.gameId
    });
    
    if (!progress) {
      return res.status(404).json({ msg: 'No progress found for this game' });
    }
    
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No progress found for this game' });
    }
    
    res.status(500).send('Server error');
  }
});

// @route   POST api/progress/:gameId
// @desc    Create or update progress for a game
// @access  Private
router.post('/:gameId', auth, async (req, res) => {
  try {
    const { score, data } = req.body;
    
    // Check if game exists
    const game = await Game.findById(req.params.gameId);
    if (!game) {
      return res.status(404).json({ msg: 'Game not found' });
    }
    
    // Find existing progress or create new one
    let progress = await Progress.findOne({
      user: req.user.id,
      game: req.params.gameId
    });
    
    if (progress) {
      // Update existing progress
      progress.score = score;
      progress.data = data || progress.data;
      progress.updatedAt = Date.now();
    } else {
      // Create new progress
      progress = new Progress({
        user: req.user.id,
        game: req.params.gameId,
        score,
        data: data || {}
      });
    }
    
    await progress.save();
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;