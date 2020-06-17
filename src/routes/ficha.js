const express = require('express');
const router = express.Router();
const { crear_ficha, guardar_ficha, mostrar_fichas, borrar_ficha, editar_ficha, envio_editar_ficha } = require('../controller/fichas.controller');

const { loged } = require('../lib/loged');

//fichas
router.get('/add', loged, crear_ficha);
router.post('/add', loged, guardar_ficha);
router.get('/', loged, mostrar_fichas);
router.get('/delete/:id', loged, borrar_ficha);
router.get('/edit/:id', loged, editar_ficha);
router.post('/edit/:id', loged, envio_editar_ficha);

module.exports = router;