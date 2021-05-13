const restaurantModel = require('../models/Restaurant').Restaurant
const foodTypeModel = require('../models/FoodType').FoodType
const raitingModel = require('../models/Rating').Rating
const { Op } = require("sequelize");



class SearchController{
 
    static async findByName(req, res, next){        
        let form = req.body
        let restaurantName = form.restaurantName;
        let restaurants = await restaurantModel.findAll({where: {name: restaurantName}});
        let foodTypes = await foodTypeModel.findAll({include: restaurantModel});
        res.render('restaurant/index', {restaurants, foodTypes});
    }

    static async findByFoodType(req, res, next){
        let form = req.body
        let restaurantFood = form.restaurantFood;
        let restaurants = await restaurantModel.findAll({where:{foodTypeId: restaurantFood}});
        let foodTypes = await foodTypeModel.findAll({include: restaurantModel});
        res.render('restaurant/index',{restaurants, foodTypes});

    }

   static async findByLocation(req, res, next){
        let form = req.body
        let restaurantLocation = form.restaurantLocation;
        let foodTypes = await foodTypeModel.findAll({include: restaurantModel});

        let restaurants = await restaurantModel.findAll({
            where: {
              [Op.or]: [
                { address: restaurantLocation},
                { city: restaurantLocation}
              ]
            }
          });
        res.render('restaurant/index',{restaurants, foodTypes});
    }
    
    static async findByRating(req, res, next){
        let form = req.body
        console.log(form);
        if (form.ratingValues == 'higherRating'){
          let restaurantsHigher = await raitingModel.getRestaurantHigherRating();
          res.render('restaurant/index',{restaurants: restaurantsHigher});
        }
        if(form.ratingValues == 'lowerRating'){
          let restaurantsLower = await raitingModel.getRestaurantLowerRating();
          console.log(restaurantsLower);
          res.render('restaurant/index',{restaurants: restaurantsLower});
        }
    }
}

module.exports = {SearchController};