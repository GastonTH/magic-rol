const express = require('express');
const router = express.Router();

function validUser(req, res, next) {
    console.log('is valid');
    //next();//paso al siguiente end point
}

function createUser(req, res, next) {
    console.log('is create');
    //next();//paso al siguiente end point
}

//ruta que validara el usuario
router.get('/users/isValidUser', validUser);
router.get('/users/createUser', createUser);


module.exports = router;