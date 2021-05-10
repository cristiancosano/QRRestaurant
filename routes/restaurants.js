var express = require('express');
var router = express.Router();
var {RestaurantController} = require('../controllers/RestaurantController');
const checkAdminUser = require('../middlewares/checkAdminUser');


/* GET restaurant show. */
router.get('/create', checkAdminUser, (req, res, next) => RestaurantController.create(req, res, next));
router.post('/store', checkAdminUser, (req, res, next) => RestaurantController.store(req, res, next));
router.get('/:id', (req, res, next) => RestaurantController.show(req, res, next));
router.get('/:id/edit', checkAdminUser, (req, res, next) => RestaurantController.edit(req, res, next));
router.post('/:id/update', checkAdminUser, (req, res, next) => RestaurantController.update(req, res, next));
router.post('/:id/delete', checkAdminUser, (req, res, next) => RestaurantController.delete(req, res, next));

router.get('/update', checkAdminUser, (req, res, next) => RestaurantController.updateFreeSeats(req, res, next));


module.exports = router;
