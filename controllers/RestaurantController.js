const restaurantModel = require('../models/Restaurant').Restaurant
const foodTypeModel = require('../models/FoodType').FoodType
const historyModel = require('../models/History').History
const { Op } = require("sequelize");
const { Sockets } = require('../sockets/qrScanner/socket')


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

        let params = req.params;
        let restaurant = await restaurantModel.findOne({where: {id: params.id}, include: foodTypeModel});
        let data = restaurant.toJSON();
        data.average = await restaurant.getAverage();
        data.message = message;
        data.danger = danger;
        res.render('restaurant/show', data);
    }

    static async manage(req, res, next){
        var message = undefined
        if(req.cookies.message){
            var message = req.cookies.message;
            res.clearCookie('message');
        }
        let restaurants = await restaurantModel.findAll({where: {userDni: req.session.currentUser.dni}});
        res.render('restaurant/manage', {restaurants, message});
    }

    static async create(req, res, next){
        let foodTypes = await foodTypeModel.findAll();
        res.render('restaurant/create', {foodTypes});
    }

    static async store(req, res, next){ //Almacenar nuevo restaurante
        let form = req.body;

        const restaurant = await restaurantModel.create({ 
            name:form.name, 
            address:form.address, 
            capacity:form.capacity, 
            freeSeats:form.capacity, 
            city:form.city, 
            description:form.description, 
            menu:'',
            photos:'',
            userDni:req.session.currentUser.dni,
            foodTypeId:form.foodType
        });

        if(req.files){
            if(req.files.restaurantMenu && req.files.restaurantMenu.mimetype=='application/pdf'){
                let menuUploadPath = global.appRoot + '/public/assets/restaurantMenu/' + restaurant.id+'.pdf';
                req.files.restaurantMenu.mv(menuUploadPath, (err)=>{
                    if(!err){
                        restaurant.update({menu: restaurant.id+'.pdf'});
                    }
                })
            }
            if(req.files.photos && req.files.photos.length > 0){
                let photoUploadPath = global.appRoot + '/public/assets/img/';
                let photos = [];
                req.files.photos.forEach((element, i) => {

                    let name = '';
                    if(element.mimetype == 'image/jpeg' || element.mimetype == 'image/jpg'){ 
                        name += restaurant.id+'-'+i+'.jpg';
                    }
                    if(element.mimetype == 'image/png'){
                        name += restaurant.id+'-'+i+'.png';
                    }
                    photos.push(name);
                    element.mv(photoUploadPath+name, (err)=>{
                        if(!err) restaurant.update({photos})
                        else restaurant.pop();
                    })


                });

            }
        }
        res.redirect('/my-restaurants');
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

        var restaurant = await restaurantModel.findOne({where: {id: params.id}});
        restaurant.update({
            name:form.name, 
            address:form.address, 
            capacity:form.capacity, 
            city:form.city, 
            description:form.description, 
            userDni:req.session.currentUser.dni,
            foodTypeId:form.foodType
        });

        if(req.files){
            if(req.files.restaurantMenu && req.files.restaurantMenu.mimetype=='application/pdf'){
                let menuUploadPath = global.appRoot + '/public/assets/restaurantMenu/' + params.id+'.pdf';
                req.files.restaurantMenu.mv(menuUploadPath, (err)=>{
                    if(!err){
                        restaurant.update({menu: restaurant.id+'.pdf'});
                    }
                })
            }
            if(req.files.photos && req.files.photos.length > 0){
                let photoUploadPath = global.appRoot + '/public/assets/img/';
                let photos = [];
                req.files.photos.forEach((element, i) => {

                    let name = '';
                    if(element.mimetype == 'image/jpeg' || element.mimetype == 'image/jpg'){ 
                        name += params.id+'-'+i+'.jpg';
                    }
                    if(element.mimetype == 'image/png'){
                        name += params.id+'-'+i+'.png';
                    }
                    photos.push(name);
                    element.mv(photoUploadPath+name, (err)=>{
                        if(!err) restaurant.update({photos})
                        else restaurant.pop();
                    })


                });

            }
        }


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
        let form = req.query;
        let history = await historyModel.findOne({
            where: {
                [Op.and]: [{restaurantId: form.restaurant}, {userDni: form.user}]
            },
            order: [['createdAt', 'DESC']]
        });

        let restaurant = await restaurantModel.findOne({where: {id: form.restaurant}});

        if(history == null ||  history.createdAt.getTime() != history.updatedAt.getTime()){ // El usuario intenta entrar
            console.log('restaurant.length: '+ (restaurant.freeSeats - parseInt(form.companions)))
            if(restaurant != null && restaurant.freeSeats - parseInt(form.companions) -1 >= 0){ // Hay aforo disponible
                 history = await historyModel.create({ companions: form.companions, restaurantId: form.restaurant, userDni: form.user})
                 await restaurant.update({ capacity: restaurant.capacity, freeSeats: (restaurant.freeSeats - form.companions - 1)})
                 res.send({status: true, message: "All ok!", action: 'Entry'});
                 Sockets.emit(form.user, {action: 'entry', status: 'Success', restaurant: form.restaurant})
                }
            else{ // No hay aforo disponible
                Sockets.emit(form.user, {action: 'entry', status: 'capacityExceeded', restaurant: form.restaurant})
                res.send({status: false, message: "The restaurant doesn't have free seats. Showing alternatives to user."})
            }
        }
        else if(history != null){ 
            await restaurant.update({freeSeats: restaurant.freeSeats + parseInt(form.companions) + 1});
            const companions = history.companions;
            await history.update({ companions: 1000 });
            await history.update({companions})
            res.send({status: true, message: "All ok!", action: 'Exit'});
            Sockets.emit(form.user, {action: 'exit', status: 'Success', restaurant: form.restaurant})
        }
        else{ //Algo no es válido

        }


    }

    static async alternatives(req, res, next){
       


        let colaRestaurante = listaColasRestaurantes[params.id];

        let entrarCola = 'no';

        if(entrarCola == 'si')
        {
            colaRestaurante.push(req.session.currentUser.dni)
        }
        else
        {

            let params = req.params;
            let restaurant = await restaurantModel.findOne({where: {id: params.id}, include: foodTypeModel});
            let restaurants = await restaurantModel.findAll({where: {
                [Op.and]: [{city: restaurant.city}, {[Op.not]: [{id: restaurant.id}]} ]
            }, include: foodTypeModel})
            let data = restaurant.toJSON();
            data.restaurants = restaurants;
            res.render('restaurant/alternatives', data);

        }


    }

    




}

module.exports = {RestaurantController};