const express = require('express');
const router = express.Router();

const connection = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add'); //renderiza desde la direccion /add -> el fichero > /links/add
});

router.post('/add', async(req, res) => {
    await connection.query('INSERT INTO links set ?', req.body);

    req.flash('success', 'Link guardado satisfactoriamente'); //tiene dos parametros, nombre variable y texto

    res.redirect('/links');
});


router.get('/', async(req, res) => {
    const links = await connection.query('SELECT * FROM links');
    //console.log(links);

    res.render('links/list', { links: links }); //renderiza el fichero list de la ruta links/list

});

router.get('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await connection.query('DELETE FROM links WHERE id = ?', [id]);

    req.flash('delete', 'Se ha borrado satisfactoriamente'); //mensaje delete
    res.redirect('/links');
});

router.get('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const consulta = await connection.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(consulta[0]);

    res.render('links/edit', { Link: consulta[0] });
});

router.post('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const paramUpdate = {
        title,
        url,
        description
    };
    await connection.query('UPDATE links set ? where id=?', [paramUpdate, id]);
    req.flash('edit', 'Link editado');
    res.redirect('/links')
})

module.exports = router;