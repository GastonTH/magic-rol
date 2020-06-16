const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//helpers
const helpers = require('../lib/helpers');

const connection = require('../database');

passport.use('inicio.sesion', new LocalStrategy({

    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async(req, username, password, done) => {

    const isValidUser = await connection.query('SELECT * FROM usuarios WHERE username = ?', [username]);

    if (isValidUser.length > 0) {
        const usuario = isValidUser[0];
        console.log(usuario);
        const isValidPassword = await helpers.login(password, usuario.password); //primero la contrasenya plana con la cifrada

        if (isValidPassword) {
            done(null, usuario, req.flash('loginOK', 'Welcome' + usuario.username))
        } else {
            done(null, false, req.flash('errorPassword', 'Contraseña incorrecta'));
        }

    } else {
        return done(null, false, req.flash('ErrorLoginNoExiste', 'No se encontro el usuario'));
    }



}));

passport.use('registro.local', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async(req, username, password, done) => {

    const { nombre, apellido, correo_electronico } = req.body;

    const nuevoUsuario = {
        username,
        password,
        nombre,
        apellido,
        correo_electronico

    }

    //const isDupeMail = await connection.query();

    nuevoUsuario.password = await helpers.encriptar(password);
    const result = await connection.query('INSERT INTO usuarios SET ?', [nuevoUsuario]);
    nuevoUsuario.id = result.insertId;

    return done(null, nuevoUsuario);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});