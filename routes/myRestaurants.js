var express = require('express');
var router = express.Router();
var {RestaurantController} = require('../controllers/RestaurantController');
const checkAdminUser = require('../middlewares/checkAdminUser');


/* GET restaurant show. */
router.get('/', checkAdminUser ,(req, res, next) => RestaurantController.manage(req, res, next));

module.exports = router;
