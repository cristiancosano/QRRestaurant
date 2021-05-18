const foodTypeModel = require('../models/FoodType').FoodType
const restaurantModel = require('../models/Restaurant').Restaurant

module.exports = async (req, res, next) => {
    res.locals.session = req.session;
    res.locals.currentUrl = req.url;
    res.locals.primaryMenuFoodTypes = await foodTypeModel.findAll({include: restaurantModel});
    res.locals.currentPath = req.originalUrl;
    res.locals.host = req.hostname;
    res.locals.hostname = req.hostname;
    next();
}