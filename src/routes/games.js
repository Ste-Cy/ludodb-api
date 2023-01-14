const express = require('express');
const GameService = require('../services/games');
const { game } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();
const gameService = new GameService(game);

// Get all games
router.get('/', async (req, res) => {
  try {
    const data = await gameService.get();
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

// Get game by id
router.get('/:id', async (req, res) => {
  try {
    const data = await gameService.getById(req.params.id);
    if (data === null) {
      res.status(404).json({ status: 'error', message: 'game not exist' });
    } else {
      res.status(200).json({ status: 'success', data });
    }
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

// Add a game
router.post('/', auth, async (req, res) => {
  const data = req.body;
  try {
    const newGame = await gameService.create(data);
    res.status(201).json({ status: 'success', dataCreated: newGame.dataValues });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

// update a game
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const gameExist = await gameService.isExist(id);
    if (!gameExist) {
      res.status(404).json({ status: 'error', message: 'game not exist' });
    } else {
      try {
        const data = req.body;
        await gameService.update(data, id);
        res.status(200).json({ status: 'success', message: 'game updated' });
      } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
      }
    }
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

// delete a game
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const gameExist = await gameService.isExist(id);
    if (!gameExist) {
      res.status(404).json({ status: 'error', message: 'game not exist' });
    } else {
      try {
        await gameService.delete(id);
        res.status(200).json({ status: 'success', message: 'game deleted' });
      } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
      }
    }
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
