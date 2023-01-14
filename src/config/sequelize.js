const Sequelize = require('sequelize');
const config = require('.');

const sequelize = new Sequelize(
  config.DATABASE_NAME,
  config.DATABASE_USERNAME,
  config.DATABASE_PASSWORD,
  {
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    dialect: 'postgres',
    logging: false,
    define: {
      freezeTableName: true, // le nom du model correspond au nom de la table
    },
  },
);

module.exports = sequelize;
