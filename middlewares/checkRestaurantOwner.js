const restaurantModel = require('../models/Restaurant').Restaurant;
module.exports = async (req, res, next) =>{
    let params = req.params;
    let restaurant = await restaurantModel.findOne({where: {id: params.id}});
    if(restaurant != null && restaurant.userDni == req.session.currentUser.dni){
        next()
    }
    else{
        res.cookie('danger', 'Acceso denegado, no puede acceder a la página solicitada debe ser propietario de este restaurante')
        res.redirect('/');
    }
} 