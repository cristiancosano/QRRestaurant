const { Model, DataTypes } = require('sequelize');
const { SequelizeManager } = require('./SequelizeManager');
const sequelize = SequelizeManager.getInstance();

class Restaurant extends Model {
  async getAverage(){
    let ratings = await this.getRatings();
    var average=0;
    var cont=0;
    ratings.forEach(rating => { 
        average += rating.rating;
        cont++;
    });
    
    average /= cont;

    return average;
  }
}
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