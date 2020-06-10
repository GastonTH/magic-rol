let connection = undefined;

//funcion que, exporta getConection con la conexion a la base de datos
module.exports.getConection = function() { //devuelve la conexion a la base de datos

    const mysql = require('mysql');

    let config = ({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'magic_rol'
    });

    if (!connection) connection = mysql.createConnection(config);
    return connection;
}