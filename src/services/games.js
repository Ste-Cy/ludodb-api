const { ValidationError } = require('sequelize');

class GameService {
  /** Sequelize CRUD Game
   *
   * @class GameService
   * @param {*} Game - Sequelize Game model
   */
  constructor(Game) {
    this.game = Game;
  }

  /**
   * Sequelize query - Get all games
   *
   * @async
   * @function get
   * @return {Promise<game[]>} - Return instances of Sequelize Game model in a array
   */
  async get() {
    try {
      return await this.game.findAll();
    } catch (err) {
      throw new Error('failed to retrieve resource');
    }
  }

  /**
   * Sequelize query - retrieve a game by id
   *
   * @async
   * @function getById
   * @param {number} id - Game id in database
   * @return {Promise<game>} - Return instance of Sequelize Game model
   */
  async getById(id) {
    try {
      return await this.game.findByPk(id);
    } catch (err) {
      throw new Error('failed to retrieve resource');
    }
  }

  /**
   * Sequelize query - create a game
   *
   * @async
   * @function create
   * @param {object} data - Data send by client
   * @return {Promise<game>} - Return instance of Sequelize Game model
   */
  async create(data) {
    try {
      return await this.game.create(data);
    } catch (err) {
      if (err instanceof ValidationError) {
        /*
          récupération des erreurs de validation dans un tableau
          la propriété errors est un tableau de ValidationsErrorItems
          la propriété ValidationsErrorItems.message contient le message d'erreur
        */
        const errors = err.errors.map((item) => item.message);
        throw new Error(errors);
      } else {
        throw new Error('failed to create resource');
      }
    }
  }

  /**
   * Sequelize query - update a game by id
   *
   * @async
   * @function update
   * @param {object} data - Data send by client
   * @param {number} id - Game id in database
   * @return {Promise}
   */
  async update(data, id) {
    try {
      return await this.game.update(data, {
        where: { id },
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors = err.errors.map((item) => item.message);
        throw new Error(errors);
      } else {
        throw new Error('failed to update resource');
      }
    }
  }

  /**
   * Sequelize query - delete a game by id
   *
   * @async
   * @function delete
   * @param {number} id - Game id in database
   * @return {Promise}
   */
  async delete(id) {
    try {
      return await this.game.destroy({
        where: { id },
      });
    } catch (err) {
      throw new Error('failed to delete resource');
    }
  }

  /**
   * Sequelize query - test if a game exist
   *
   * @async
   * @function isExist
   * @param {number} id - Game id in database
   * @return {Promise<boolean>}
   */
  async isExist(id) {
    try {
      const game = await this.game.findByPk(id, {
        attributes: ['id', 'title'],
      });
      return !!await game;
    } catch (err) {
      throw new Error('failed to retrieve resource');
    }
  }
}

module.exports = GameService;
