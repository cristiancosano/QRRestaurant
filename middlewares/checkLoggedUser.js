module.exports = (req, res, next) =>{
    if(req.session.currentUser!=undefined){
        next()
    }
    else{
        res.cookie('danger', 'Acceso denegado, para acceder a esta página debe iniciar sesion')
        res.redirect('/');
    }
} 