const express = require('express');
const router = express.Router();

//importamos el fichero passport
const passportLib = require('passport');
const { loged, notLoged } = require('../lib/loged');

router.get('/registro', notLoged, (req, res) => { //la que renderiza el formulario
    res.render('auth/registro');
});

router.post('/registro', notLoged, passportLib.authenticate('registro.local', { //la que envia las cosas del formulario
    successRedirect: '/perfil',
    failureRedirect: '/registro',
    failureFlash: true
}));

router.get('/perfil', loged, (req, res) => {
    res.render('perfil');
});

router.get('/login', notLoged, (req, res) => { //la que renderiza el formulario de login
    res.render('auth/login');
});

router.post('/login', notLoged, (req, res, next) => { //lo que llama cuando pulsas el boton de login

    passportLib.authenticate('inicio.sesion', {

        successRedirect: '/perfil',
        failureRedirect: '/login',
        failureFlash: true

    })(req, res, next)

})

router.get('/cerrarSesion', loged, (req, res) => {
    req.logOut();
    res.redirect('/login');
})


module.exports = router;