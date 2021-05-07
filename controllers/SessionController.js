class SessionController{

    // Muestra el formulario de inicio de sesion
    static login(req, res, next){
        res.render('login/login');
    }

    // Comprueba los datos y almacena la sesión si son validos
    static save(req, res, next){

    }

    // Cierra la sesion
    static logout(req, res, next){
        
    }
}

module.exports = {
    SessionController
}