const express = require('express');
const router = express.Router();

const connection = require('../database');

const { loged } = require('../lib/loged');

router.get('/add', loged, (req, res) => {
    res.render('ficha/add'); //renderiza desde la direccion /add -> el fichero > /ficha/add
});

router.post('/add', loged, async(req, res) => {

    const { title, url, description } = req.body;

    const nuevaFicha = {
        title,
        url,
        description,
        user_id: req.user.id
    }
    await connection.query('INSERT INTO ficha set ?', nuevaFicha);

    req.flash('success', 'Ficha guardado satisfactoriamente'); //tiene dos parametros, nombre variable y texto

    res.redirect('/ficha');
});


router.get('/', loged, async(req, res) => {
    const ficha = await connection.query('SELECT * FROM ficha WHERE user_id = ?', req.user.id);
    res.render('ficha/list', { ficha: ficha }); //renderiza el fichero list de la ruta ficha/list

});

router.get('/delete/:id', loged, async(req, res) => {
    const { id } = req.params;
    await connection.query('DELETE FROM ficha WHERE id = ?', [id]);

    req.flash('delete', 'Se ha borrado satisfactoriamente'); //mensaje delete
    res.redirect('/ficha');
});

router.get('/edit/:id', loged, async(req, res) => {
    const { id } = req.params;
    const consulta = await connection.query('SELECT * FROM ficha WHERE id = ?', [id]);
    console.log(consulta[0]);

    res.render('ficha/edit', { ficha: consulta[0] });
});

router.post('/edit/:id', loged, async(req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const paramUpdate = {
        title,
        url,
        description
    };
    await connection.query('UPDATE ficha set ? where id=?', [paramUpdate, id]);
    req.flash('edit', 'Ficha editado');
    res.redirect('/ficha')
})

module.exports = router;