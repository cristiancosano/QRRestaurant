const qrcode = require('qrcode')
class QRCodeController{

    static async index(req, res, next){

       
        res.render('qrCode/formQR');
       
    }

    static async create(req,res,next)
    {
        
        let form = req.body; 
       
       
        let qrData = await qrcode.toDataURL(req.headers.host + "?user="+ req.session.currentUser + "&companions=" + form.nAcomp);
        res.render('qrcode/qrcode', {qrData});
       

    }

    static async update(req, res, next){

       let params = req.params;
        res.render('qrCode/formQR');
       
    }
}

module.exports = {QRCodeController};
