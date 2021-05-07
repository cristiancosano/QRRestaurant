var express = require('express');
var router = express.Router();
var {RestaurantController} = require('../controllers/RestaurantController')


/* GET restaurant show. */
router.get('/', (req, res, next) => RestaurantController.manage(req, res, next));

module.exports = router;
