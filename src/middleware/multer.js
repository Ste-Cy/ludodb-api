const multer = require('multer');
const config = require('../config');

/**
 * @module multer
 * multer middleware - file upload handler
 */

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

// Définition du chemin et nom du fichier
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, config.UPLOAD_FOLDER);
  },
  filename: (req, file, callback) => {
    // récupération extension fichier image envoyé
    const extension = MIME_TYPES[file.mimetype];
    // renommage fichier avec le timestamp
    callback(null, `IMG-${Date.now()}.${extension}`);
  },
});

// Filtrer les fichiers uploadés
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg'
      || file.mimetype === 'image/jpg'
      || file.mimetype === 'image/png'
      || file.mimetype === 'image/png'
      || file.mimetype === 'image/webp'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    cb(new Error('bad image format'));
  }
};

const uploadHandler = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2 MB limit
  },
  fileFilter,
});

module.exports = uploadHandler;
