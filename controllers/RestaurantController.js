const restaurantModel = require('../models/Restaurant').Restaurant
class RestaurantController{

    static async index(req, res, next){
        let restaurants = await restaurantModel.findAll();
        res.render('restaurant/index', {restaurants});
    }

    static async show(req, res, next){
        let params = req.params;
        let restaurant = await restaurantModel.findOne({where: {id: params.id}})
        let data = restaurant.toJSON();
        data.average = await restaurant.getAverage();
        res.render('restaurant/show', data);
    }

    static async manage(req, res, next){
        var message = undefined
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
        let params = req.params;

        //Eliminar con restaurantModel form.id
        let restaurant = await restaurantModel.findOne({where: {id: params.id}});
        await restaurantModel.destroy({where: {id: params.id}});

        res.cookie('message', 'El restaurante '+ restaurant.name +' ha sido eliminado correctamente!')
        res.redirect('/my-restaurants');
    }

}

module.exports = {RestaurantController};
