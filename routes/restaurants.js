var express = require('express');
const { RatingController } = require('../controllers/RatingController');
var router = express.Router();
var {RestaurantController} = require('../controllers/RestaurantController');
const checkAdminUser = require('../middlewares/checkAdminUser');


/* GET restaurant show. */
router.get('/create', checkAdminUser, (req, res, next) => RestaurantController.create(req, res, next));
router.post('/store', checkAdminUser, (req, res, next) => RestaurantController.store(req, res, next));
router.get('/update', (req, res, next) => RestaurantController.updateFreeSeats(req, res, next));
router.get('/:id', (req, res, next) => RestaurantController.show(req, res, next));
router.get('/:id/edit', checkAdminUser, (req, res, next) => RestaurantController.edit(req, res, next));
router.post('/:id/update', checkAdminUser, (req, res, next) => RestaurantController.update(req, res, next));
router.post('/:id/delete', checkAdminUser, (req, res, next) => RestaurantController.delete(req, res, next));
router.get('/:id/alternatives', (req, res, next) => RestaurantController.alternatives(req, res, next));
router.post('/:id/addToQueue', (req, res, next) => RestaurantController.addToQueue(req, res, next));
router.post('/:id/rate', (req, res, next) => RatingController.store(req, res, next));



module.exports = router;
