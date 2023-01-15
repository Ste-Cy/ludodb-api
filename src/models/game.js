const config = require('../config');

const game = (sequelize, DataTypes) => {
  const Game = sequelize.define('game', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'title cannot be empty' },
        notNull: { msg: 'title is required' },
      },
    },
    cover: { // image game box cover
      type: DataTypes.STRING,
      get() {
        const img = this.getDataValue('cover');
        if (img) {
          const imgUrl = `${config.MEDIA_URL}/${img}`;
          return imgUrl;
        }
        return null;
      },
    },
    yearPub: { // publication year
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'yearPub value must be an integer',
        },
      },
    },
    playerMin: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'playerMin value must be an integer',
        },
        min: { args: [1], msg: 'playerMin value cannot be less than 1' },
      },
    },
    playerMax: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'playerMax value must be an integer',
        },
        min: { args: [1], msg: 'playerMax value cannot be less than 1' },
        playerMaxValidate(value) {
          if (value < this.playerMin) {
            throw new Error('playerMax cannot be less than playerMin');
          }
        },
      },
    },
    durationMinutesMin: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'durationMinutesMin value must be an integer',
        },
      },
    },
    durationMinutesMax: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'durationMinutesMax value must be an integer',
        },
        durationMaxValidate(value) {
          if (value < this.durationMinutesMin) {
            throw new Error('durationMinutesMax cannot be less than durationMinutesMin');
          }
        },
      },
    },
    age: { // age minimum
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'age value must be an integer',
        },
        min: {
          args: [1],
          msg: 'age value cannot be less than 1',
        },
        max: {
          args: [18],
          msg: 'age Value cannot be greater than 18',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: false,
  });

  Game.associate = (models) => {
    // Many-To-Many association - join table name : gameAuthor
    Game.belongsToMany(models.author, {
      through: 'gameAuthor', unique: false, timestamps: false,
    });
  };

  return Game;
};

module.exports = game;
