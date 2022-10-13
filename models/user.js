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
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
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