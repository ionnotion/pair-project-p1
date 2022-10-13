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
    static getTitle(name,founder) {
      console.log(`${name} founded by ${founder}`)
      return `${name} founded by ${founder}`
    }
    static associate(models) {
      // define association here
      Company.belongsTo(models.User)
      Company.hasOne(models.Stock)
    }
  }
  Company.init({
    name: DataTypes.STRING,
    founder: DataTypes.STRING,
    logo: DataTypes.STRING,
    field: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.TEXT,
    foundIn: DataTypes.DATE,
    UserId : {
      type : DataTypes.INTEGER,
      references : {
        model : `Users`,
        key : `id`
      }
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};