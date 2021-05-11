const RatingModel = require('../models/Rating').Rating
class RatingController{

    static async create(req, res, next){ 
        res.render('rating/create');
    }

    static async store(req, res, next){ //Almacenar nuevo restaurante
        let form = req.body;
        let ratingInfo = await RatingModel.findOne({ where:{ userOwner: req.session.currentUser}})
        let restaurant = await restaurantModel.findOne({where: {id: form.restaurant}});

        if( ratingInfo == null) //No hay reseñas previas
        {
            await RatingModel.create({ 
                rating: form.rating, 
                opinion: form.opinion, 
                userOwner: req.session.currentUser
            });
        }
        else
        {           
            await ratingInfo.update({rating: form.rating , opinion: form.opinion })
        }

        res.redirect('/my-restaurants');
    }
}

module.exports = {QRCodeController};
