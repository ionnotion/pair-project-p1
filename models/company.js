'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init({
    name: DataTypes.STRING,
    founder: DataTypes.STRING,
    logo: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    foundingTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};