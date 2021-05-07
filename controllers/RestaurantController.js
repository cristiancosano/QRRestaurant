const restaurantModel = require('../models/Restaurant').Restaurant
class RestaurantController{

    constructor(){

    }

    static async index(req, res, next){
        let restaurants = await restaurantModel.findAll();
        res.render('restaurant/index', {restaurants});
    }

    static async show(req, res, next){
        let params = req.params;
        let restaurant = await restaurantModel.findOne({where: {id: params.id}})
        res.render('restaurant/show', restaurant.toJSON());
    }

    static async manage(req, res, next){
        var message = undefined
        console.log(req.cookies.message)
        if(req.cookies.message){
            var message = req.cookies.message;
            res.clearCookie('message');
        }
        let restaurants = await restaurantModel.findAll();
        res.render('restaurant/manage', {restaurants, message});
    }

    create(){

    }

    static async edit(req, res, next){ //Devolver vista de editar
        let params = req.params;
        let restaurant = await restaurantModel.findOne({where: {id: params.id}})
        res.render('restaurant/edit', restaurant.toJSON());
    }

    static async store(req, res, next){ //Almacenar nuevo restaurante
        let params = req.body;

    }

    static async update(req, res, next){ //Modificar restaurante
        let params = req.params;
        let form = req.body;

        //Actualizar con restaurantModel params.id
        
        res.cookie('message', 'El restaurante '+ form.name +' ha sido actualizado correctamente!')
        res.redirect('/my-restaurants');
    }

    static async delete(req, res, next){ //Eliminar restaurante
        let form = req.body;

        //Eliminar con restaurantModel form.id

        res.cookie('message', 'El restaurante '+ form.name +' ha sido eliminado correctamente!')
        res.redirect('/my-restaurants');
    }

}

module.exports = {
    RestaurantController
}