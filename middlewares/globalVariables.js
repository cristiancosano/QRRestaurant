const foodTypeModel = require('../models/FoodType').FoodType
const restaurantModel = require('../models/Restaurant').Restaurant

module.exports = async (req, res, next) => {
    res.locals.session = req.session;
    res.locals.currentUrl = req.url;
    res.locals.foodTypes = foodTypeModel.findAll({include: restaurantModel});
    next();
}