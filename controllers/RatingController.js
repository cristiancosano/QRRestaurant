const RatingModel = require('../models/Rating').Rating
const { Op } = require("sequelize");

class RatingController{

    static async create(req, res, next){ 
        res.render('rating/create');
    }

    static async store(req, res, next){ 
        let form = req.params;
        let rating = req.body.rating;

        if(req.session.currentUser == undefined){
            res.cookie('danger', 'Para valorar el restaurante debes <a href="/login">iniciar sesión</a> primero. Si aun no estás registrado, <a href="/register">registrate</a>.')
            res.redirect('/restaurants/'+req.params.id);
        }
        else{
            let ratingUser = await RatingModel.findOne({ where:{ 
                [Op.and]: [{userDni: req.session.currentUser.dni}, {restaurantId: form.id}]}
            });
    
            if( ratingUser == null) //El usuario no ha valorado ese restaurante
            {
                await RatingModel.create({ 
                    rating: rating,
                    restaurantId: form.id,
                    userDni: req.session.currentUser.dni
                });
            }
            else
            {         
                await ratingUser.update({rating: rating, where:{
                    [Op.and]: [{userDni: req.session.currentUser.dni}, {restaurantId: form.id}]    
                }})
            }
            res.cookie('message', '¡Valoración añadida correctamente! Gracias por ser parte de la gran comunidad que estamos formando 😊.')
            res.redirect('/restaurants/'+req.params.id);
        }
    }
}

module.exports = {RatingController};
