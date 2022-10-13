'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserDetail.belongsTo(models.User)
    }
  }
  UserDetail.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    balance: DataTypes.INTEGER,
    validationQuestion: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty : {msg: `Recovery Question must be selected!`},
        notNull : {msg: `Recovery Question must be selected!`}
      }
    },
    validationAnswer: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty : {msg: `Recovery Answer must be selected!`},
        notNull : {msg: `Recovery Answer must be selected!`}
      }
    },
  }, {
    hooks : {
      beforeCreate: (instance) => {
        instance.balance = 100000
      }
    },
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};