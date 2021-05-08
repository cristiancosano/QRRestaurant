module.exports = (req, res, next) =>{
    if(req.session.currentUser!=undefined && req.session.currentUser.admin){
        next()
    }
    else{
        res.cookie('danger', 'Acceso denegado, no puede acceder a la página solicitada debe ser administrador de restaurantes')
        res.redirect('/');
    }
} 