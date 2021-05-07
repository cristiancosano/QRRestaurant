const { Model, DataTypes } = require('sequelize');
const { SequelizeManager } = require('./SequelizeManager');
const sequelize = SequelizeManager.getInstance();

class Restaurant extends Model {}
Restaurant.init({
  name: {type: DataTypes.STRING},
  address: DataTypes.STRING,
  capacity: DataTypes.INTEGER,
  city: DataTypes.STRING,
  description: DataTypes.STRING,
  menu: DataTypes.STRING,
  category: DataTypes.STRING,
  photos: DataTypes.JSON

}, { sequelize, modelName: 'restaurant', tableName: 'restaurant'});


module.exports = {
    Restaurant
}