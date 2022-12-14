'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stock.belongsTo(models.Company)
      Stock.hasMany(models.Investment)
      // Stock.belongsToMany(models.User, {through: `Investments`})
    }
  }
  Stock.init({
    name: DataTypes.STRING,
    totalLots: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};