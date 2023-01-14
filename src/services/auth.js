/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');

class AuthService {
  /** Authentification
   *
   * @class AuthService
   * @param {*} Member - Sequelize Member model
   */
  constructor(Member) {
    this.user = Member;
  }

  /** Generate JWT function
   *
   * @param {*} user - Sequelize Member model
   * @function getToken
   * @return {string} - Return a token
   */

  genToken(user) {
    const token = jwt.sign(
      { username: user.username },
      config.JWT_SECRET,
      { subject: user.id.toString(), expiresIn: '30d' },
    );
    return token;
  }

  /** login request
   *
   * @param {*} username
   * @param {*} password
   * @returns {string} - Return a token
   */
  async login(username, password) {
    try {
      const user = await this.user.findOne({
        where: {
          username,
        },
      });
      if (user === null) {
        throw new Error('username not exist');
      }
      // vérification du mot de passe
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        throw new Error('invalid password');
      }
      const token = this.genToken(user);
      return token;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = AuthService;
