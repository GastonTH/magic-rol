const express = require('express');
const router = express.Router();

const connection = require('../database');

const { loged } = require('../lib/loged');

router.get('/add', loged, (req, res) => {
    res.render('links/add'); //renderiza desde la direccion /add -> el fichero > /links/add
});

router.post('/add', loged, async(req, res) => {

    const { title, url, description } = req.body;

    const nuevaFicha = {
        title,
        url,
        description,
        user_id: req.user.id
    }
    await connection.query('INSERT INTO links set ?', nuevaFicha);

    req.flash('success', 'Link guardado satisfactoriamente'); //tiene dos parametros, nombre variable y texto

    res.redirect('/links');
});


router.get('/', loged, async(req, res) => {
    const links = await connection.query('SELECT * FROM links WHERE user_id = ?', req.user.id);
    //console.log(links);

    res.render('links/list', { links: links }); //renderiza el fichero list de la ruta links/list

});

router.get('/delete/:id', loged, async(req, res) => {
    const { id } = req.params;
    await connection.query('DELETE FROM links WHERE id = ?', [id]);

    req.flash('delete', 'Se ha borrado satisfactoriamente'); //mensaje delete
    res.redirect('/links');
});

router.get('/edit/:id', loged, async(req, res) => {
    const { id } = req.params;
    const consulta = await connection.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(consulta[0]);

    res.render('links/edit', { Link: consulta[0] });
});

router.post('/edit/:id', loged, async(req, res) => {
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