var express = require('express');
var router = express.Router();
var {RestaurantController} = require('../controllers/RestaurantController')


router.get('/:id', (req, res, next) => RestaurantController.indexWithFoodType(req, res, next));

module.exports = router;
