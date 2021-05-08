const qrcode = require('qrcode')
class QRCodeController{

    static async create(req, res, next){
        res.render('qrCode/create');
    }

    static async show(req,res,next){
        let form = req.body; 
        let qrData = await qrcode.toDataURL(req.headers.host + "?user="+ req.session.currentUser + "&companions=" + form.nAcomp);
        res.render('qrcode/show', {qrData});
    }
}

module.exports = {QRCodeController};
