//funcion que, exporta getConection con la conexion a la base de datos
module.exports.getConection = () => { //devuelve la conexion a la base de datos

    const mysql = require('mysql');

    let config = ({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'magic_rol'
    });

    let usersConnection = mysql.createConnection(config);

    return usersConnection;

}