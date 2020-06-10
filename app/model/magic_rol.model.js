//funcion que, exporta getConection con la conexion a la base de datos
module.exports.getConection = function() { //devuelve la conexion a la base de datos

    const mysql = require('mysql');

    let config = ({
        host: 'localhost',
        user: 'admin_rol',
        password: 'gx53$Q7@005',
        database: 'magic_rol'
    });

    let connection = mysql.createConnection(config);

    return connection;

}