const model = require("../model/magic_rol.model");

//funcion que verificara si el usuario esta registrado
exports.isValidUser = async(req, res) => {

    const connection = await model.getConection();

    connection.connect(async err => {
        if (!err) {
            let sql = 'select * from usuarios';
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    return console.error(error.message);
                }
                res.send(results);
                connection.end();

            });
            console.log('conexion cerrada');

        } else {
            console.log(err);

        }
    })
};