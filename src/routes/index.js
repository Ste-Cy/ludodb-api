const express = require('express');
const gamesRoutes = require('./games');
const uploadRoutes = require('./upload');
const loginRoutes = require('./login');

const router = express.Router();
router.use('/games', gamesRoutes);
router.use('/upload', uploadRoutes);
router.use('/login', loginRoutes);

module.exports = router;
