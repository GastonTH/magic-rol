const express = require('express');
const router = express.Router();

//importamos el fichero passport
const passportLib = require('passport');

router.get('/registro', (req, res) => { //la que renderiza el formulario
    res.render('auth/registro');
});

router.post('/registro', passportLib.authenticate('registro.local', { //la que envia las cosas del formulario
    successRedirect: '/perfil',
    failureRedirect: '/registro',
    failureFlash: true
}));

router.get('/perfil', (req, res) => {
    res.render('profile');
});

router.get('/login', (req, res) => { //la que renderiza el formulario de login
    res.render('auth/login');
});

router.post('/login', (req, res, next) => { //lo que llama cuando pulsas el boton de login

    passportLib.authenticate('inicio.sesion', {

        successRedirect: '/perfil',
        failureRedirect: '/login',
        failureFlash: true

    })(req, res, next)

})


module.exports = router;