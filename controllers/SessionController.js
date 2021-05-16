const userModel = require('../models/User').User


class SessionController{

    // Muestra el formulario de inicio de sesion
    static login(req, res, next){
        var message = undefined;
        var danger = undefined;
        if(req.cookies.message){
            message = req.cookies.message;
            res.clearCookie('message');
        }
        if(req.cookies.danger){
            danger = req.cookies.danger;
            res.clearCookie('danger');
        }
        res.render('login/login', {message, danger});
    }

    // Comprueba los datos y almacena la sesión si son validos
    static async save(req, res, next){
        let params = req.body;
        let user = await userModel.findOne({where: {email: params.email, password: params.password}})
        if(user == null){
            res.cookie('danger', 'Email y contraseña incorrecta.')
            res.redirect('/login');
        }else{
            req.session.currentUser = user;
            res.cookie('message', 'Has iniciado sesión correctamente. Nos alegra tenerte por aquí de nuevo 😉')
            res.redirect('/');
        }
    }
    // Cierra la sesion
    static logout(req, res, next){
        req.session.destroy();
        res.cookie('message', 'Has cerrado sesión correctamente. Hasta pronto! 👋🏻')
        res.redirect('/');
        res.redirect('/');
    }
}

module.exports = {
    SessionController
}