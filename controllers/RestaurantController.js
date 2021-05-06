const restaurantModel = require('../models/User').User
class RestaurantController{

    constructor(){

    }

    static async index(req, res, next){
        var restaurants = await restaurantModel.findAll();
        res.render('index', {restaurants});
    }

    static async show(req, res, next){
        var restaurant = await restaurantModel.findOne({where: {dni: '32731385Q'}})
        res.render('index', user.toJSON());
    }

    create(){

    }

    edit(){ //Devolver vista de editar

    }

    store(){ //Almacenar datos

    }

}

module.exports = {
    RestaurantController
}