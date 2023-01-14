/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const config = require('../config');

/** Authentification middleware
 * @module auth
 */

module.exports = (req, res, next) => {
  try {
    const { headers } = req;
    // vérifie que le header Authorization est présent dans la requête
    if (!headers || !headers.authorization) {
      return res.status(401).json({ status: 'error', message: 'missing authorization header' });
    }

    // vérifie la présence du token
    const [scheme, token] = headers.authorization.split(' ');
    if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) {
      return res.status(401).json({
        status: 'error', message: 'missing bearer token',
      });
    }

    // vérifie le token
    jwt.verify(token, config.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        return res.status(403).json({ status: 'error', message: 'fail to Authentication (bad token)' });
      }
      const { userId } = decodedToken.sub;
      req.userId = { userId };
      next();
    });
  } catch {
    return res.status(403).json({ status: 'error', message: 'fail to Authentication' });
  }
};
