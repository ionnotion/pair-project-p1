'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require(`bcryptjs`);
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Stock, {through:`Investments`})
      User.hasMany(models.Investment)
      User.hasOne(models.UserDetail)
      User.hasOne(models.Company)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate: {
        notEmpty : {msg: `Username cannot be empty!`},
        notNull : {msg: `Username cannot be null!`},
        min: {
          args: 6,
          msg: {msg: `Username must be 6-15 characters long`}
        },
        max: {
          args: 15,
          msg: {msg: `Username must be 6-15 characters long`}
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate : {
        notEmpty : {msg: `Email cannot be empty!`},
        notNull : {msg: `Email cannot be null!`},
        isEmail : {msg: `Email must be in email format!`}
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty : {msg: `Password cannot be empty!`},
        notNull : {msg: `Password cannot be null!`},
        min: {
          args: 6,
          msg: {msg: `Password must be 6-15 characters long`}
        },
        max: {
          args: 15,
          msg: {msg: `Password must be 6-15 characters long`}
        }
      }
    },
    role : DataTypes.STRING
  }, {
    hooks: {
      beforeCreate : (user) => {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(user.password, salt)
        user.password = hash
        user.role = `Investor`
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};