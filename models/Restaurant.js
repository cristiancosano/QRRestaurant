const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('SwP1l1E2g2', 'SwP1l1E2g2', 'jH5505UucH', {
    host: 'remotemysql.com',
    dialect: 'mysql'
});

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

//Restaurant.sync({force: true})



module.exports = {
    Restaurant
}

