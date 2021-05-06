const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('SwP1l1E2g2', 'SwP1l1E2g2', 'jH5505UucH', {
    host: 'remotemysql.com',
    dialect: 'mysql'
});

class User extends Model {}
User.init({
  dni: {type: DataTypes.STRING, primaryKey: true},
  email: DataTypes.STRING,
  password: DataTypes.STRING

}, { sequelize, modelName: 'user', tableName: 'user', timestamps: false });

module.exports = {
    User
}