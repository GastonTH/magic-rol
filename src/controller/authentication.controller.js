const controller_auth = {}
const passportLib = require('passport');

controller_auth.form_registro = (req, res) => { //la que renderiza el formulario
    res.render('auth/registro');
};

controller_auth.isSignIn = passportLib.authenticate('registro.local', { //la que envia las cosas del formulario
    successRedirect: '/perfil',
    failureRedirect: '/registro',
    failureFlash: true
});

controller_auth.mostrar_perfil = (req, res) => {
    res.render('perfil');
};

controller_auth.form_login = (req, res) => { //la que renderiza el formulario de login
    res.render('auth/login');
};

controller_auth.login = (req, res, next) => {

    passportLib.authenticate('inicio.sesion', {

        successRedirect: '/perfil',
        failureRedirect: '/login',
        failureFlash: true

    })(req, res, next)

};

controller_auth.cerrar_sesion = (req, res) => {
    req.logOut();
    res.redirect('/login');
};

controller_auth.mostrar_aventura = (req, res) => {

    res.render('ficha/aventura');

}


module.exports = controller_auth;