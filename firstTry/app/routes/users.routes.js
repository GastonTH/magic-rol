const express = require('express');
const router = express.Router();
//variable que exporta las funciones de los controladores para posteriormente usarlas
const Users = require('../controllers/users.controllers');

//ruta que validara el usuario llamando al controlador que es el que ejecuta la funcion
router.get('/users/isValidUser', Users.isValidUser);

module.exports = router;