const { Model, DataTypes } = require('sequelize');
const { SequelizeManager } = require('./SequelizeManager');
const sequelize = SequelizeManager.getInstance();
class User extends Model {
}
User.init({
  dni: {type: DataTypes.STRING, primaryKey: true},
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  admin: {type: DataTypes.BOOLEAN, defaultValue: false}
}, { sequelize, modelName: 'user', tableName: 'user' });

module.exports = {
    User
}