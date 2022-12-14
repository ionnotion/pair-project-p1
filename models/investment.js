'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Investment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Investment.belongsTo(models.User)
      Investment.belongsTo(models.Stock)
    }
  }
  Investment.init({
    name: DataTypes.STRING,
    lot: DataTypes.INTEGER,
    StockId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate : (investment) => {
        investment.name = `${investment.StockId}${investment.UserId}-${uuidv4()}`
      }
    },
    sequelize,
    modelName: 'Investment',
  });
  return Investment;
};