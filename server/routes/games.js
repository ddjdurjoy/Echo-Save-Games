const express = require('express');
const Game = require('../models/Game');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET api/games
// @desc    Get all games
// @access  Public
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/games/:id
// @desc    Get game by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({ msg: 'Game not found' });
    }
    
    res.json(game);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Game not found' });
    }
    
    res.status(500).send('Server error');
  }
});

// @route   POST api/games
// @desc    Create a game (admin only in a real app)
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, imageUrl, embedUrl, category } = req.body;
    
    const newGame = new Game({
      title,
      description,
      imageUrl,
      embedUrl,
      category
    });
    
    const game = await newGame.save();
    res.json(game);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;