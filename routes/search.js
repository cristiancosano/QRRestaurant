var express = require('express');
var router = express.Router();
var {SearchController} = require('../controllers/SearchController')


router.post('/name', (req, res, next) => SearchController.findByName(req, res, next));
router.post('/food', (req, res, next) => SearchController.findByFoodType(req, res, next));
router.post('/location', (req, res, next) => SearchController.findByLocation(req, res, next));
router.post('/rating', (req, res, next) => SearchController.findByRating(req, res, next));

module.exports = router;