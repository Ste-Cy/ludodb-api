const express = require('express');
const AuthService = require('../services/auth');
const { member } = require('../models');

const router = express.Router();
const authService = new AuthService(member);

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ status: 'error', message: 'missing username' });
  }
  if (!password) {
    return res.status(400).json({ status: 'error', message: 'missing password' });
  }
  try {
    const token = await authService.login(username, password);
    return res.status(201).json({ status: 'success', token });
  } catch (err) {
    return res.status(400).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
