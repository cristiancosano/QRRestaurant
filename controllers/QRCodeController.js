const qrcode = require('qrcode')
class QRCodeController{
    static async index(req, res, next){
        let qrData = await qrcode.toDataURL("http://google.es")
        res.render('qrcode/qrcode', {qrData});
    }
}

module.exports = {QRCodeController};
