var express = require('express');
var router = express.Router();
const { QRCodeController } = require('../controllers/QRCodeController');
const checkLoggedUser = require('../middlewares/checkLoggedUser');


router.get('/', /*checkLoggedUser,*/ (req, res, next) => QRCodeController.create(req, res, next));
router.post('/', /*checkLoggedUser,*/ (req, res, next) => QRCodeController.show(req, res, next));


module.exports = router;
