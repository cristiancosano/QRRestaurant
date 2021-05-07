var express = require('express');
var router = express.Router();
var {UserController} = require('../controllers/UserController')


router.get('/', (req, res, next) => UserController.create(req, res, next));
router.get('/', (req, res, next) => UserController.store(req, res, next));

module.exports = router;