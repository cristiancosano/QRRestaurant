var express = require('express');
var router = express.Router();
var {RestaurantController} = require('../controllers/RestaurantController')


router.get('/', (req, res, next) => res.render('about/aboutUs'));

module.exports = router;
