var express = require('express');
var router = express.Router();
var {SessionController} = require('../controllers/SessionController')


router.get('/', (req, res, next) => SessionController.login(req, res, next));
router.post('/', (req, res, next) => SessionController.save(req, res, next));

module.exports = router;