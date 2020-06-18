const express = require('express');
const router = express.Router();

//controller
const { form_registro, isSignIn, mostrar_perfil, form_login, login, cerrar_sesion, mostrar_aventura } = require('../controller/authentication.controller');

//importamos el fichero passport
const passportLib = require('passport');
const { loged, notLoged } = require('../lib/loged');

router.get('/registro', notLoged, form_registro);

router.post('/registro', notLoged, isSignIn);

router.get('/perfil', loged, mostrar_perfil);

router.get('/login', notLoged, form_login);

router.post('/login', notLoged, login);

router.get('/cerrarSesion', loged, cerrar_sesion)

router.get('/aventura', loged, mostrar_aventura);

module.exports = router;