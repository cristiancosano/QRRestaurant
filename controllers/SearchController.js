const restaurantModel = require('../models/Restaurant').Restaurant
const foodTypeModel = require('../models/FoodType').FoodType
const raitingModel = require('../models/Rating').Rating
const { Op } = require("sequelize");



class SearchController{
 
    static async findByName(req, res, next){        
        let form = req.body
        let restaurantName = form.restaurantName;
        let restaurants = await restaurantModel.findAll({where: {name: {[Op.like]: '%'+restaurantName.replace(' ', '%')+'%'}}});
        console.log('iepa', restaurants, restaurants.length, restaurantName)
        let foodTypes = await foodTypeModel.findAll({include: restaurantModel});
        if(restaurants.length == 0){
          res.cookie('danger', 'No se han encontrado resultados para el nombre del restaurante introducido.')
          res.redirect('/');
        }
        else res.render('restaurant/index', {restaurants, foodTypes, searchParam: form.restaurantName, filter: 'el nombre del restaurante'});
    }

    static async findByFoodType(req, res, next){
        let form = req.body
        let restaurantFood = form.restaurantFood;
        let restaurants = await restaurantModel.findAll({where:{foodTypeId: restaurantFood}});
        let foodTypes = await foodTypeModel.findAll({include: restaurantModel});
        let foodType = await foodTypeModel.findOne({where: {id: restaurantFood}})
        res.render('restaurant/index',{restaurants, foodTypes, searchParam: foodType.name, filter: 'el tipo de comida'});

    }

   static async findByLocation(req, res, next){
        let form = req.body
        let restaurantLocation = form.restaurantLocation;
        let foodTypes = await foodTypeModel.findAll({include: restaurantModel});

        let restaurants = await restaurantModel.findAll({
            where: {
              [Op.or]: [
                { address: {[Op.like]: '%'+restaurantLocation.replace(' ','%')+'%'} },
                { city: {[Op.like]: '%'+restaurantLocation.replace(' ','%')+'%'} }
              ]
            }
          });
          if(restaurants.length == 0){
            res.cookie('danger', 'No se han encontrado resultados para la dirección / ciudad introducida.')
            res.redirect('/');
          }
          else res.render('restaurant/index',{restaurants, foodTypes, searchParam: restaurantLocation, filter: 'la dirección / ciudad'});
    }
    
    static async findByRating(req, res, next){
        let form = req.body
        let restaurants;
        let searchParam = (form.ratingValues == 'higherRating') ? 'ordenado de mayor a menor' : 'ordenado de menor a mayor';
        if (form.ratingValues == 'higherRating'){
          restaurants = await raitingModel.getRestaurantHigherRating();
        }
        if(form.ratingValues == 'lowerRating'){
          restaurants = await raitingModel.getRestaurantLowerRating();
        }
        
        res.render('restaurant/index', {restaurants, searchParam, filter:'la valoración media'});
    }
}

module.exports = {SearchController};