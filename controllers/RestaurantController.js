const restaurantModel = require('../models/Restaurant').Restaurant
const foodTypeModel = require('../models/FoodType').FoodType

class RestaurantController{

    static async index(req, res, next){
        var danger = undefined
        if(req.cookies.danger){
            var danger = req.cookies.danger;
            res.clearCookie('danger');
        }

        var message = undefined
        if(req.cookies.message){
            var message = req.cookies.message;
            res.clearCookie('message');
        }

        let restaurants = await restaurantModel.findAll();
        let foodTypes = await foodTypeModel.findAll({include: restaurantModel});
        res.render('restaurant/index', {restaurants, foodTypes, danger, message});
    }

    static async indexWithFoodType(req, res, next){
        let params = req.params;

        let restaurants = await restaurantModel.findAll({where: {foodTypeId: params.id}});
        let foodTypes = await foodTypeModel.findAll({include: restaurantModel});
        res.render('restaurant/index', {restaurants, foodTypes});
    }

    static async show(req, res, next){
        let params = req.params;
        let restaurant = await restaurantModel.findOne({where: {id: params.id}, include: foodTypeModel});
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

    static async create(req, res, next){
        let foodTypes = await foodTypeModel.findAll();
        res.render('restaurant/create', {foodTypes});
    }

    static async store(req, res, next){ //Almacenar nuevo restaurante
        let form = req.body;
        const anonymous = await restaurantModel.create({ 
            name:form.name, 
            address:form.address, 
            capacity:form.capacity, 
            freeSeats:form.capacity, 
            city:form.city, 
            description:form.description, 
            menu:'menu',
            photos:'photo',
            userDni:req.session.currentUser.dni,
            foodTypeId:form.foodType
        });
        res.render('restaurant/my-restaurants');
        //res.render('restaurant/my-restaurants', {message: 'Restaurante Creado Correctamente'});
    }

    static async edit(req, res, next){ //Devolver vista de editar
        let params = req.params;
        let foodTypes = await foodTypeModel.findAll();
        let restaurant = await restaurantModel.findOne({where: {id: params.id}});
        res.render('restaurant/edit', {restaurant, foodTypes});
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
    
    static async updateFreeSeats(req, res, next){ //Modificar restaurante
        let params = req.params;
        let form = req.body;

        //Actualizar con restaurantModel params.id
        if(params.companions - form.freeSeats <= 0)
        {
           let restaurant = await restaurantModel.findAll({ attributes: ['capacity' , 'freeSeats']}, {where: { id: params.restaurant}})
            await restaurantModel.update({ capacity: restaurant.capacity , freeSeats: restaurant.freeSeats - params.companions} , { where:  {id: params.restaurant}})
            res.cookie('message', 'El restaurante '+ form.name +' ha sido actualizado correctamente!')
            res.redirect('/my-restaurants');
        }
        else
        {

            res.redirect('/esperarCola_MostrarAlternativos');


        }
    }


}

module.exports = {RestaurantController};