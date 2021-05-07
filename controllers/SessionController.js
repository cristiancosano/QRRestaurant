const userModel = require('../models/User').User


class SessionController{

    // Muestra el formulario de inicio de sesion
    static login(req, res, next){
        var message = undefined
        if(req.cookies.message){
            var message = req.cookies.message;
            res.clearCookie('message');
        }
        res.render('login/login', {message});
    }

    // Comprueba los datos y almacena la sesión si son validos
    static async save(req, res, next){
        let params = req.body;
        let user = await userModel.findOne({where: {email: params.email, password: params.password}})
        if(user == null){
            res.cookie('message', 'User or password not correct')
            res.redirect('/login');
        }else{
            req.session.currentUser = user;
            res.redirect('/');
        }
    }
    // Cierra la sesion
    static logout(req, res, next){
        
    }
}

module.exports = {
    SessionController
}