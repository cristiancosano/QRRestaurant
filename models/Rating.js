const { Model, DataTypes, Op } = require('sequelize');
const { QueryTypes } = require('sequelize');
const { SequelizeManager } = require('./SequelizeManager')

const sequelize = SequelizeManager.getInstance();

class Rating extends Model {
  static async getRestaurantHigherRating(){
    return await sequelize.query("SELECT foodType.name as 'foodType.name', foodType.id as 'foodType.id', restaurant.*, rating.restaurantId, AVG(rating.rating) AS MEDIA FROM `restaurant` join rating on restaurant.id = rating.restaurantId join foodType on restaurant.foodTypeId=foodType.id GROUP BY rating.restaurantId ORDER BY MEDIA DESC", { nest:true, type: QueryTypes.SELECT });
  }

  static async getRestaurantLowerRating(){
    return await sequelize.query("SELECT foodType.name as 'foodType.name', foodType.id as 'foodType.id', restaurant.*, rating.restaurantId, AVG(rating.rating) AS MEDIA FROM `restaurant` join rating on restaurant.id = rating.restaurantId join foodType on restaurant.foodTypeId=foodType.id GROUP BY rating.restaurantId ORDER BY MEDIA ASC", { nest: true, type: QueryTypes.SELECT });
  }

  static async getRatingFromUserByRestaurant(userDni, restaurantId){
    return this.findOne({where: {[Op.and]: {userDni, restaurantId}}})
  }
}

Rating.init({
  rating: {type: DataTypes.INTEGER, min: 1, max: 5},
  restaurantId: {type: DataTypes.INTEGER}, 
  userDni: {type: DataTypes.STRING}
}, { sequelize, modelName: 'rating', tableName: 'rating' });



module.exports = {
    Rating
}