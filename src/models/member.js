const member = (sequelize, DataTypes) => {
  const Member = sequelize.define('member', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'username already exits',
      },
      validate: {
        notEmpty: { msg: 'username cannot be empty' },
        notNull: { msg: 'username is required' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'email already exits',
      },
      validate: {
        notEmpty: { msg: 'email cannot be empty' },
        notNull: { msg: 'email is required' },
        isEmail: {
          msg: 'Invalid email',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'password cannot be empty' },
        notNull: { msg: 'password is required' },
      },
    },

  }, {
    timestamps: false,
  });
  return Member;
};

module.exports = member;
