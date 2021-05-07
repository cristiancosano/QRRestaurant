var express = require('express');
var router = express.Router();
var {SessionController} = require('../controllers/SessionController')


router.get('/', (req, res, next) => SessionController.logout(req, res, next));

module.exports = router;