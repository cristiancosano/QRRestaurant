var express = require('express');
var router = express.Router();
var {RestaurantController} = require('../controllers/RestaurantController')
var {User} = require('../models/User')


router.get('/', (req, res, next) => RestaurantController.index(req, res, next));

module.exports = router;
