const restaurantModel = require('../models/Restaurant').Restaurant
const { Op } = require("sequelize");
class SearchController{

    static async index(req, res, next){
        let restaurants = await restaurantModel.findAll();
        res.render('restaurant/index', {restaurants});
    }
 
    static async findByName(req, res, next){        
        let form = req.body
        let restaurantName = form.restaurantName;
        let restaurants = await restaurantModel.findAll({where: {name: restaurantName}});
        res.render('restaurant/index', {restaurants});
    }

    static async findByFoodType(req, res, next){
        let form = req.body
        let restaurantFood = form.restaurantFood;
        let restaurants = await restaurantModel.findAll({where:{category: restaurantFood}});
        res.render('restaurant/index',{restaurants});

    }

   /* static async findByLocation(req, res, next){
        let form = req.body
        let restaurantLocation = form.restaurantLocation;
        let restaurants = await restaurantModel.findAll({
            where: {
              [Op.or]: [
                { address: restaurantLocation},
                { city: restaurantLocation}
              ]
            }
          });
        res.render('restaurant/index',{restaurants});
    }

    static async findByRating(req, res, next){
        let form = req.body
        let restaurantRating = form.restaurantRating;
        let restaurants = await restaurantModel.findAll({
            where: {
                [Op.gte]: {}
             
          });
        res.render('restaurant/index',{restaurants});
    }*/
}

module.exports = {SearchController};