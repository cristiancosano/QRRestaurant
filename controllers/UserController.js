const { User } = require("../models/User");
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");


class UserController{


    // Muestra el formulario de registro
    static create(req, res, next){
        res.render('user/create');
    }

    // Comprueba los datos y los almacena en la base de datos con sequelize
    static async store(req, res, next){
        let form = req.body
        let usuario = await User.findOne({ where:{ [Op.or]: [{dni: form.dni}, {email: form.email}] }})

        if(usuario == null){
            const saltRounds = 10;
            bcrypt.hash(form.password, saltRounds, async (err, hash) => await User.create({ dni:form.dni, email:form.email, password:hash}));
            res.render('user/create', {message: 'Usuario Creado Correctamente'});
        }
        else{
            res.render('user/create', {danger: 'El email o dni ya están registrados en nuestro sistema. Pruebe a iniciar sesión.'});
        }
    }

}

module.exports = {UserController};