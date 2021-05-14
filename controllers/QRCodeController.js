const qrcode = require('qrcode')
class QRCodeController{

    static async create(req, res, next){
        res.render('qrcode/create');
    }

    static async show(req,res,next){
        let form = req.body; 
        let qrData = await qrcode.toDataURL(req.headers.host + "/restaurants/update" + "?user=" + req.session.currentUser.dni + "&companions=" + form.nAcomp);
        res.render('qrcode/show', {qrData, companions: form.nAcomp});
    }
}

module.exports = {QRCodeController};
