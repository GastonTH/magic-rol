const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//mio

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
        done(null, false, req.flash('ErrorLoginNoExiste', 'No se encontro el usuario'));
    }

}));

passport.use('registro.local', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async(req, username, password, done) => {

    const { nombre, apellido, correo_electronico } = req.body;

    let newUser = {
        username,
        password,
        nombre,
        apellido,
        correo_electronico
    }

    //const isDupeMail = await connection.query();

    newUser.password = await helpers.encriptar(password);
    const result = await connection.query('INSERT INTO usuarios SET ?', newUser);
    newUser.id = result.insertId;

    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    console.log('serialize: ' + user);
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const fila = await connection.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    done(null, fila[0]);
});