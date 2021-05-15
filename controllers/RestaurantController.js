const restaurantModel = require('../models/Restaurant').Restaurant
const foodTypeModel = require('../models/FoodType').FoodType
const historyModel = require('../models/History').History
const ratingModel = require('../models/Rating').Rating
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
        let foodType = await foodTypeModel.findOne({where: {id: params.id}})
        let foodTypes = await foodTypeModel.findAll({include: restaurantModel});
        res.render('restaurant/index', {restaurants, foodTypes, h3: 'Restaurantes de Comida '+foodType.name});
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
        let restaurant = await restaurantModel.findOne({where: {id: params.id}, include: [foodTypeModel, ratingModel]});
        let data = restaurant.toJSON();
        data.average = await restaurant.getAverage();
        data.message = message;
        data.danger = danger;
        data.currentUserRating = undefined;
        

        if(req.session.currentUser !== undefined) 
            data.currentUserRating = await restaurant.getRatingByUser(req.session.currentUser.dni)

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
            if(req.files.photos){
                let photoUploadPath = global.appRoot + '/public/assets/img/';
                let photos = [];

                let getName = (element, position, id) => {
                    let name = '';
                    if(element.mimetype == 'image/jpeg' || element.mimetype == 'image/jpg') name += id+'-'+position+'.jpg';
                    else if(element.mimetype == 'image/png') name += id+'-'+position+'.png';
                    return name;
                }

                if(req.files.photos.length > 0){
                    req.files.photos.forEach((element, i) => {

                        let name = getName(element, i, restaurant.id)
                        photos.push(name);
                        element.mv(photoUploadPath+name, (err)=>{
                            if(!err) restaurant.update({photos})
                            else restaurant.pop();
                        })


                    });
                }
                else{
                    let element = req.files.photos;
                    let name = getName(element, 0, restaurant.id);
                    photos.push(name);
                    element.mv(photoUploadPath+name, (err)=>{
                        if(!err) restaurant.update({photos})
                        else restaurant.pop();
                    })
                }

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
            if(req.files.photos){
                let getName = (element, position, id) => {
                    let name = '';
                    if(element.mimetype == 'image/jpeg' || element.mimetype == 'image/jpg') name += id+'-'+position+'.jpg';
                    else if(element.mimetype == 'image/png') name += id+'-'+position+'.png';
                    return name;
                }
                let photoUploadPath = global.appRoot + '/public/assets/img/';
                let photos = [];


                if(req.files.photos.length > 0){
                    req.files.photos.forEach((element, i) => {
                        let name = getName(element, i, params.id);
                        photos.push(name);
                        element.mv(photoUploadPath+name, (err)=>{
                            if(!err) restaurant.update({photos})
                            else restaurant.pop();
                        })
    
    
                    });
                }
                else{
                    let element = req.files.photos;
                    let name = getName(element, 0, params.id);
                    photos.push(name);
                    element.mv(photoUploadPath+name, (err)=>{
                        if(!err) restaurant.update({photos})
                        else restaurant.pop();
                    })
                }
                

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
        let params = req.body;
        if(params.id == undefined) params = req.query;
        let history = await historyModel.findOne({
            where: {
                [Op.and]: [{restaurantId: form.restaurant}, {userDni: form.user}]
            },
            order: [['createdAt', 'DESC']]
        });

        let restaurant = await restaurantModel.findOne({where: {id: form.restaurant}});
        let restaurantQueue = restaurantModel.restaurantsQueue.find(restaurant => restaurant.id == params.restaurant);


        if(history == null ||  history.createdAt.getTime() != history.updatedAt.getTime()){ // El usuario intenta entrar

            if(restaurant != null && restaurant.freeSeats - parseInt(form.companions) -1 >= 0 && (restaurantQueue === undefined || restaurantQueue.queue.length == 0 || restaurantQueue.queue.length > 0 && parseInt(restaurantQueue.queue[0].companions)+1 <= restaurant.freeSeats) ){ // Hay aforo disponible
                if(restaurantQueue !== undefined && restaurantQueue.queue.length > 0){//Es una persona que estaba en la cola
                    let currentRestaurant = restaurantQueue.queue.shift();
                    restaurantQueue.queue.forEach(user => {
                        let people = parseInt(user.companions)+1;
                        console.log('asientos libres', restaurant.freeSeats, 'asientos que ocupa el inquilino', parseInt(currentRestaurant.companions), 'diferencia', restaurant.freeSeats-parseInt(currentRestaurant.companions), 'proximo en cola', people, 'cabe el proximo?', restaurant.freeSeats-parseInt(currentRestaurant.companions) >= people, 'usuario', user.user)
                        if(restaurant.freeSeats-parseInt(currentRestaurant.companions) >= people){ //El siguiente de la cola también puede entrar
                            Sockets.emit(user.user, 'yourTurn', {action: 'yourTurn', status:'scanQRAgain', restaurant: form.restaurant});
                        }
                        else{ //No cabe nadie más, les decimos que la cola se ha reducido en uno a todos los demás
                            Sockets.emit(user.user, 'oneLess', {action: 'oneLess', status: 'lessPersons :)', restaurant: form.restaurant});
                        }
                    })
                }
                 history = await historyModel.create({ companions: form.companions, restaurantId: form.restaurant, userDni: form.user})
                 await restaurant.update({ capacity: restaurant.capacity, freeSeats: (restaurant.freeSeats - form.companions - 1)})
                 res.send({status: true, message: "All ok!", action: 'Entry'});
                 Sockets.emit(form.user, 'qr', {action: 'entry', status: 'Success', restaurant: form.restaurant})
            }
            else{ // No hay aforo disponible
                Sockets.emit(form.user, 'qr', {action: 'entry', status: 'capacityExceeded', restaurant: form.restaurant})
                res.send({status: false, message: "The restaurant doesn't have free seats. Showing alternatives to user."})
            }
        }
        else if(history != null){ // El usuario intenta salir
            await restaurant.update({freeSeats: restaurant.freeSeats + parseInt(form.companions) + 1});
            const companions = history.companions;
            await history.update({ companions: 1000 }); //Este update es solo temporal para forzar la actualización del updateAt
            await history.update({companions})
            res.send({status: true, message: "All ok!", action: 'Exit'});
            Sockets.emit(form.user, 'qr', {action: 'exit', status: 'Success', restaurant: form.restaurant})
            
            //Notificamos a los usuarios de la cola si los hay

           
            if(restaurantQueue != undefined &&  restaurantQueue.queue.length>0 && (parseInt(restaurantQueue.queue[0].companions) + 1) <= restaurant.freeSeats){
                // let counter = 0;
                // for(let i = 0; (i < restaurantQueue.queue.length) && counter < freeSeats; i++){ // Avisamos para entrar a todos los usuarios que caben  
                //     let queue = restaurantQueue.queue[i];
                //     let user = queue.user.user;
                //     counter += parseInt(queue.companions)+1;
                //     if(counter <= freeSeats)
                //         Sockets.emit(user, 'yourTurn', {action: 'yourTurn', status:'scanQRAgain', restaurant: form.restaurant});
                // }
                let user = restaurantQueue.queue[0];
                Sockets.emit(user.user, 'yourTurn', {action: 'yourTurn', status:'scanQRAgain', restaurant: form.restaurant});
            }

            
        }
        else{ //Algo no es válido

        }


    }

    static async alternatives(req, res, next){
       



        let entrarCola = 'no';

        if(entrarCola == 'si')
        {
            let colaRestaurante = listaColasRestaurantes[params.id];
            colaRestaurante.push(req.session.currentUser.dni)

            res.redirect('restaurant/waiting', params.id ); //Mandamos el id del restaurante
        }
        else
        {

            let params = req.params;
            let restaurant = await restaurantModel.findOne({where: {id: params.id}, include: foodTypeModel});
            let restaurants = await restaurantModel.findAll({where: {
                [Op.and]: [{city: restaurant.city}, {[Op.not]: [{id: restaurant.id}]} ]
            }, include: foodTypeModel})
            let data = restaurant.toJSON();
            data.restaurants = restaurants;
            res.render('restaurant/alternatives', data);


        }


    }

    static addToQueue(req, res, next){
        let params = req.params;
        let form = req.body;
        let user = req.session.currentUser.dni;
        let message = '';
        
        let restaurant = restaurantModel.restaurantsQueue.find(restaurant => restaurant.id == params.id);
        if(restaurant === undefined){
            restaurant = {id: params.id, queue: new Array()}
            restaurantModel.restaurantsQueue.push(restaurant);
        }

        if(restaurant.queue.filter( (element) => element.user == user).length == 0){
            if(form.companions == undefined || form.companions == "") form.companions = '0';
            restaurant.queue.push({user, companions: form.companions});
            message = 'included'
        } 
        else message = 'already included'
        
        res.send({message, restaurant})
        
    }


    
    static async waitingQueue(req,res,next)
    {
       while(1)
        { 
            let colaRestaurante = listaColasRestaurantes[params.id];

           
            
            

                if(colaRestaurante.first == colaRestaurante[req.session.currentUser.dni])
                {
                    let datosColaRestaurante = await restaurantModel.findOne({where: {id: params.id}, include: foodTypeModel});

                    if(datosColaRestaurante.freeSeats >= req.companions + 1)
                    {
                        //Quitar al usuario de la espera
                        colaRestaurante.pop(req.session.currentUser.dni);

                        res.render('restaurant/YourTurn', data);
                        break;
                    }
  
                }
            
        }



        if( 1 ) //Si el usuario cancela la espera
        {
         colaRestaurante.pop(req.session.currentUser.dni);
         
        }

    }

}

module.exports = {RestaurantController};