const express = require('express');
const uploadHandler = require('../middleware/multer');
const auth = require('../middleware/auth');
const GameService = require('../services/games');
const { game } = require('../models');

const router = express.Router();
const gameService = new GameService(game);
const upload = uploadHandler.single('cover');

// upload game cover
router.put('/:id', auth, upload, async (req, res) => {
  if (!req.file) {
    res.status(400).json({ status: 'error', message: 'missing file' });
  } else {
    try {
      const { id } = req.params;
      const gameExist = await gameService.isExist(id);
      if (!gameExist) {
        res.status(400).json({ status: 'error', message: 'game not exist - abort upload' });
      } else {
        try {
          const cover = req.file.filename;
          await gameService.update({ cover }, id);
          res.status(200).json(
            { status: 'success', message: 'game cover updated' },
          );
        } catch (err) {
          res.status(400).json({ status: 'error', message: err.message });
        }
      }
    } catch (err) {
      res.status(400).json({ status: 'error', message: err.message });
    }
  }
});

module.exports = router;
