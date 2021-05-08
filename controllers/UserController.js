const { User } = require("../models/User");

class UserController{


    // Muestra el formulario de registro
    static create(req, res, next){
        res.render('user/create');
    }

    // Comprueba los datos y los almacena en la base de datos con sequelize
    static async store(req, res, next){
        let form = req.body
        const anonymous = await User.create({ dni:form.dni, email:form.email, password:form.password});
        res.render('user/create', {message: 'Usuario Creado Correctamente'});
    }

}

module.exports = {UserController};