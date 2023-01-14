const author = (sequelize, DataTypes) => {
  const Author = sequelize.define('author', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'author already exits',
      },
      validate: {
        notEmpty: { msg: 'name cannot be empty' },
        notNull: { msg: 'name is required' },
      },
    },
  }, {
    timestamps: false,
  });

  Author.associate = (models) => {
    // Many-To-Many association - join table name : gameAuthor
    Author.belongsToMany(models.game, {
      through: 'gameAuthor', unique: false, timestamps: false,
    });
  };

  return Author;
};

module.exports = author;
