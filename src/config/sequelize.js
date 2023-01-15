const Sequelize = require('sequelize');
const config = require('.');

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASS,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: config.DB_SSL,
    },
    logging: false,
    define: {
      freezeTableName: true, // le nom du model correspond au nom de la table
    },
  },
);

module.exports = sequelize;
