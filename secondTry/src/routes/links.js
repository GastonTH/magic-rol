const express = require('express');
const router = express.Router();

const connection = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add'); //renderiza desde la direccion /add -> el fichero > /links/add
});

router.post('/add', async(req, res) => {
    const { title, url, description } = req.body;
    await connection.query('INSERT INTO links set ?', req.body);
    res.redirect('/links');
});


router.get('/', async(req, res) => {
    const links = await connection.query('SELECT * FROM links');
    console.log(links);
    res.render('links/list', { links: links }); //renderiza el fichero list de la ruta links/list

});

module.exports = router;