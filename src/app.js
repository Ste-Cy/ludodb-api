/* eslint-disable consistent-return */
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const config = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  const message = 'LudoDB API - Welcome';
  res.status(200).send(message);
});

app.use(config.API_BASE, routes);

// dossier des média
app.use('/media', express.static(config.UPLOAD_FOLDER));

app.use(({ res }) => {
  res.status(404).json({ status: 'error', message: 'ressource not found' });
});

module.exports = app;
