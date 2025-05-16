const express = require('express');
const Progress = require('../models/Progress');
const User = require('../models/User');

const router = express.Router();

// @route   GET api/leaderboard
// @desc    Get global leaderboard across all games
// @access  Public
router.get('/', async (req, res) => {
  try {
    const leaderboard = await Progress.find()
      .sort({ score: -1 })
      .limit(100)
      .populate('user', 'name')
      .populate('game', 'title category');
    
    res.json(leaderboard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/leaderboard/:gameId
// @desc    Get leaderboard for a specific game
// @access  Public
router.get('/:gameId', async (req, res) => {
  try {
    const leaderboard = await Progress.find({ game: req.params.gameId })
      .sort({ score: -1 })
      .limit(50)
      .populate('user', 'name')
      .populate('game', 'title category');
    
    res.json(leaderboard);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Game not found' });
    }
    
    res.status(500).send('Server error');
  }
});

module.exports = router;