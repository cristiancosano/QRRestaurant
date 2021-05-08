var express = require('express');
var router = express.Router();
const { QRCodeController } = require('../controllers/QRCodeController');


router.post('/', (req, res, next) => QRCodeController.create(req, res, next));
router.get('/', (req, res, next) => QRCodeController.index(req, res, next));

module.exports = router;
