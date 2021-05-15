const { Model, DataTypes, Op } = require('sequelize');
const ratingModel = require('./Rating').Rating;
const { SequelizeManager } = require('./SequelizeManager');
const sequelize = SequelizeManager.getInstance();

class Restaurant extends Model {

  static restaurantsQueue = new Array();


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

  async getRatingByUser(dni){
    return ratingModel.getRatingFromUserByRestaurant(dni, this.id);
  }
}
Restaurant.init({
  name: {type: DataTypes.STRING},
  address: DataTypes.STRING,
  capacity: DataTypes.INTEGER,
  freeSeats: DataTypes.INTEGER,
  city: DataTypes.STRING,
  description: DataTypes.STRING,
  menu: DataTypes.STRING,
  photos: DataTypes.JSON

}, { sequelize, modelName: 'restaurant', tableName: 'restaurant'});


module.exports = {
    Restaurant
}