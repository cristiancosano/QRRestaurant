const { Sequelize, Model, DataTypes } = require('sequelize');
const { Rating } = require('./Rating');
const { Restaurant } = require('./Restaurant');
const { SequelizeManager } = require('./SequelizeManager');
const sequelize = SequelizeManager.getInstance();
class User extends Model {
}
User.init({
  dni: {type: DataTypes.STRING, primaryKey: true},
  email: DataTypes.STRING,
  password: DataTypes.STRING

}, { sequelize, modelName: 'user', tableName: 'user' });

module.exports = {
    User
}