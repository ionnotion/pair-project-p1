'use strict';
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
    price: DataTypes.INTEGER,
    CompanyId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate : (investment) => {
        investment.name = `${CompanyId}-${UserId}-${new Date().getTime()}`
      }
    },
    sequelize,
    modelName: 'Investment',
  });
  return Investment;
};