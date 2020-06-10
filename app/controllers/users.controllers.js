const connection = require("../model/magic_rol.model").getConection();

//funcion que verificara si el usuario esta registrado
exports.isValidUser = (req, res) => {

    connection.connect((err) => {
        if (!err) {
            let sql = 'select * from usuarios';
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    return console.error(error.message);
                }
                res.send(results);

            });
            connection.end();
            console.log('conexion cerrada');

        } else {
            console.log('error de conexion');

        }
    })
};