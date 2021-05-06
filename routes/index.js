var express = require('express');
var router = express.Router();
var {RestaurantController} = require('../controllers/RestaurantController')

/* GET home page. */
//router.get('/', function(req, res, next) {
 // res.render('index', { title: 'Man', lastName: 'Cortes'});
//});

router.get('/', (req, res, next) => RestaurantController.index(req, res, next));

module.exports = router;
