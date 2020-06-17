const controller_ficha = {};
const connection = require('../database');

controller_ficha.crear_ficha = (req, res) => {
    res.render('ficha/add'); //renderiza desde la direccion /add -> el fichero > /ficha/add
};

controller_ficha.guardar_ficha = async(req, res) => {

    const { nombre, alias, nivel, experiencia, fuerza, defensa, vitalidad, inteligencia, destreza, fe, carisma } = req.body;

    const nuevaFicha = {
        nombre,
        alias,
        nivel,
        experiencia,
        fuerza,
        defensa,
        vitalidad,
        inteligencia,
        destreza,
        fe,
        carisma,
        user_id: req.user.id
    }
    await connection.query('INSERT INTO ficha set ?', nuevaFicha);

    req.flash('success', 'Ficha guardado satisfactoriamente'); //tiene dos parametros, nombre variable y texto

    res.redirect('/ficha');

    console.log(nuevaFicha);

};

controller_ficha.mostrar_fichas = async(req, res) => {
    const ficha = await connection.query('SELECT * FROM ficha WHERE user_id = ?', req.user.id);
    res.render('ficha/list', { ficha: ficha }); //renderiza el fichero list de la ruta ficha/list

};
controller_ficha.borrar_ficha = async(req, res) => {
    const { id } = req.params;
    await connection.query('DELETE FROM ficha WHERE id = ?', [id]);

    req.flash('delete', 'Se ha borrado satisfactoriamente'); //mensaje delete
    res.redirect('/ficha');
};

controller_ficha.editar_ficha = async(req, res) => {
    const { id } = req.params;
    const consulta = await connection.query('SELECT * FROM ficha WHERE id = ?', [id]);
    console.log(consulta[0]);

    res.render('ficha/edit', { ficha: consulta[0] });
}

controller_ficha.envio_editar_ficha = async(req, res) => {
    const { id } = req.params;
    const { nombre, alias, nivel, experiencia, fuerza, defensa, vitalidad, inteligencia, destreza, fe, carisma } = req.body;

    const nuevaFicha = {
        nombre,
        alias,
        nivel,
        experiencia,
        fuerza,
        defensa,
        vitalidad,
        inteligencia,
        destreza,
        fe,
        carisma,
        user_id: req.user.id
    }
    await connection.query('UPDATE ficha set ? where id=?', [nuevaFicha, id]);
    req.flash('edit', 'Ficha editado');
    res.redirect('/ficha')
};

module.exports = controller_ficha;