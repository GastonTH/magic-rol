const mysql = require('mysql');
const { database } = require('./db.config');
const util = require('util');
//creando la conexion

const connection = mysql.createPool(database);

connection.getConnection((err, connection) => {

    if (err) {

        if (err.code == 'PROTOCOL_CONNECTION_LOST') { //si la base de datos pierde la conexion
            console.error('ERROR LA CONEXION A LA BASE DE DATOS SE CERRO');
        }

        if (err.code == 'ER_CON_COUNT_ERROR') {
            console.error('LA BASE DE DATOS TIENE DEMASIADAS CONEXIONES')
        }

        if (err.code == 'ECONNREFUSED') {
            console.error('LA CONEXION FUE RECHAZADA');
        }

    }

    if (connection) connection.release();
    console.log('CONEXION SATISFACTORIA');
    return;
});

connection.query = util.promisify(connection.query); //forma de hacer promesas con node y su complemento promisify de utils

module.exports = connection;