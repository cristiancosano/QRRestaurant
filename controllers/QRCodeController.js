const qrcode = require('qrcode')
class QRCodeController{

    static async create(req, res, next){
        res.render('qrcode/create');
    }

    static async show(req,res,next){
        let form = req.body; 
<<<<<<< HEAD
        let qrData = await qrcode.toDataURL(req.headers.host +   "?user="+ req.session.currentUser + "&companions=" + form.nAcomp);
=======
        let qrData = await qrcode.toDataURL(req.headers.host + "/restaurants/update" + "?user=" + req.session.currentUser.dni + "&companions=" + form.nAcomp);
>>>>>>> a7828df08908cf1b8da02b47a9318e1b5b8501e5
        res.render('qrcode/show', {qrData});
    }
}

module.exports = {QRCodeController};
