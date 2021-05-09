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
        let restaurants = await restaurantModel.findAll({where: {userDni: req.session.currentUser.dni}});
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
            menu:'',
            photos:'',
            userDni:req.session.currentUser.dni,
            foodTypeId:form.foodType
        });

        if(req.files){
            if(req.files.restaurantMenu && req.files.restaurantMenu.mimetype=='application/pdf'){
                let menuUploadPath = global.appRoot + '/public/assets/restaurantMenu/' + anonymous.id+'.pdf';
                req.files.restaurantMenu.mv(menuUploadPath, (err)=>{
                    if(!err){
                        anonymous.update({menu: anonymous.id+'.pdf'});
                    }
                })
            }
            if(req.files.photos && req.files.photos.length > 0){
                let photoUploadPath = global.appRoot + '/public/assets/img/';
                let photos = [];
                req.files.photos.forEach((element, i) => {

                    let name = '';
                    if(element.mimetype == 'image/jpeg' || element.mimetype == 'image/jpg'){ 
                        name += anonymous.id+'-'+i+'.jpg';
                    }
                    if(element.mimetype == 'image/png'){
                        name += anonymous.id+'-'+i+'.png';
                    }
                    photos.push(name);
                    element.mv(photoUploadPath+name, (err)=>{
                        if(!err) anonymous.update({photos})
                        else anonymous.pop();
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

        const anonymous = await restaurantModel.update({
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
        },{where: {id: params.id}, include: restaurantModel});

        if(req.files){
            if(req.files.restaurantMenu && req.files.restaurantMenu.mimetype=='application/pdf'){
                let menuUploadPath = global.appRoot + '/public/assets/restaurantMenu/' + anonymous.id+'.pdf';
                req.files.restaurantMenu.mv(menuUploadPath, (err)=>{
                    if(!err){
                        anonymous.update({menu: anonymous.id+'.pdf'});
                    }
                })
            }
            if(req.files.photos && req.files.photos.length > 0){
                let photoUploadPath = global.appRoot + '/public/assets/img/';
                let photos = [];
                req.files.photos.forEach((element, i) => {

                    let name = '';
                    if(element.mimetype == 'image/jpeg' || element.mimetype == 'image/jpg'){ 
                        name += anonymous.id+'-'+i+'.jpg';
                    }
                    if(element.mimetype == 'image/png'){
                        name += anonymous.id+'-'+i+'.png';
                    }
                    photos.push(name);
                    element.mv(photoUploadPath+name, (err)=>{
                        if(!err) anonymous.update({photos})
                        else anonymous.pop();
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
        let params = req.params;
        let form = req.body;

        //Actualizar con restaurantModel params.id
      
        let history = await HistoryModel.findOne({ attributes: ['createdAt','updatedAt']} , {where: {restaurantId: params.restaurant}, order: [['createdAt', 'ASC']]});
        if(history.updatedAt != "")
        {

        
            let restaurant = await restaurantModel.findAll({ attributes: ['capacity' , 'freeSeats']}, {where: { id: params.restaurant}});
             if(params.companions - restaurant.freeSeats <= 0)
             {
                 await HistoryModel.create({ companions: params.companions, restaurantId: params.restaurant, userDni: req.session.currentUser.dni})
                 await restaurantModel.update({ capacity: restaurant.capacity , freeSeats: restaurant.freeSeats - params.companions} , { where:  {id: params.restaurant}})
                 res.cookie('message', 'El restaurante '+ form.name +' ha sido actualizado correctamente!')
                 res.redirect('/my-restaurants');

             }
             else
              {

             res.redirect('/esperarCola_MostrarAlternativos');

                }
    }
    else
    {
        let restaurant = await restaurantModel.findAll({ attributes: ['capacity' , 'freeSeats']}, {where: { id: params.restaurant}});
        let NEWDATETIME = Date.now();
        await restaurantModel.update({ capacity: restaurant.capacity , freeSeats: restaurant.freeSeats + params.companions} , { where:  {id: params.restaurant}})
        await HistoryModel.update({ updateAt: NEWDATETIME} , {where: {restaurantId: params.restaurant, createdAt: history.createdAt}})
        res.cookie('message', 'El restaurante '+ form.name +' ha sido actualizado correctamente!')
        

    }


    }









}

module.exports = {RestaurantController};