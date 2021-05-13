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
            res.cookie('danger', 'No puedes valorar el restaurante, inicia sesión.')
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
            res.cookie('message', 'Has valorado este restaurante!')
            res.redirect('/restaurants/'+req.params.id);
        }
    }
}

module.exports = {RatingController};
