require('dotenv').config();

const config = require('./src/config');
const app = require('./src/app');
const sequelize = require('./src/config/sequelize');

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync()
      .then(() => {
        app.listen(config.PORT, () => {
          if (process.env.NODE_ENV === 'development') {
            console.log(`Server listening at ${config.HOST}`);
          }
        });
      })
      .catch((error) => { throw new Error(error); });
  }).catch((error) => { throw new Error(error); });
