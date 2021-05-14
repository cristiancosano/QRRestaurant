module.exports = (req, res, next) =>{
    if(req.session.currentUser!=undefined){
        next()
    }
    else{
        res.cookie('danger', 'Acceso denegado, para acceder debes <a href="/login">iniciar sesion</a>. Si aún no estás registrado, <a href="/register">registrate</a> primero.')
        res.redirect('/');
    }
} 