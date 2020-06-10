const conexionBD = require("../model/magic_rol.model").getConection();

//funcion que verificara si el usuario esta registrado
exports.isValidUser = (req, res) => {

    res.send('funciona')


    /*conexionBD.connect((err) => {

        if (!err) {

            let sql = `SELECT * FROM usuarios`;
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    return console.error(error.message);
                }
                console.log(results);
            });


        } else {

            console.log("Error al acceder a la base de datos");


        }

    })*/
};