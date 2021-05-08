var express = require('express');
var router = express.Router();
var {RestaurantController} = require('../controllers/RestaurantController')


/* GET restaurant show. */
router.get('/create', (req, res, next) => RestaurantController.create(req, res, next));
router.get('/:id', (req, res, next) => RestaurantController.show(req, res, next));
router.post('/store', (req, res, next) => RestaurantController.store(req, res, next));
router.get('/:id/edit', (req, res, next) => RestaurantController.edit(req, res, next));
router.post('/:id/update', (req, res, next) => RestaurantController.update(req, res, next));
router.post('/:id/delete', (req, res, next) => RestaurantController.delete(req, res, next));

module.exports = router;
