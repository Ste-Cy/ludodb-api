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
          console.log(`Server listening at http://localhost:${config.PORT}`);
        });
      })
      .catch((error) => { throw new Error(error); });
  }).catch((error) => { throw new Error(error); });
