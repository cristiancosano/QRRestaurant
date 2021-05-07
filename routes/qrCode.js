var express = require('express');
var router = express.Router();
const { QRCodeController } = require('../controllers/QRCodeController');



router.get('/', (req, res, next) => QRCodeController.index(req, res, next));

module.exports = router;
