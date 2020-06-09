const mysql = require('mysql');
const config = require('./db/config.js');
const express = require('express');
const path = require('path');
const app = express();

    let connection = mysql.createConnection(config);

    let sql = `SELECT * FROM usuarios`;
    connection.query(sql, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log(results);
    });

    connection.end();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log(" * [ Magic Rol ] UP and Running en http://localhost:3000");
});