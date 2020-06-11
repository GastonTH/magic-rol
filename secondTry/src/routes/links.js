const express = require('express');
const router = express.Router();

const connection = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async(req, res) => {

    const { title, url, description } = req.body;
    await connection.query('INSERT INTO links set ?', req.body);

    res.send('llamado');
});

module.exports = router;