const express = require('express');
const path = require('path');
//inicializo express
const app = express();
//handlebass para las vistas
const handlebass = require('express-handlebars');
//mensajes
const flash = require('connect-flash');
//sesiones para flash
const session = require('express-session');
//exportar la conexion a la base de datos
const { database } = require('./db.config');
//mysql sesiones
const MySQLStore = require('express-mysql-session')(session);
//morgan
const morgan = require('morgan');
//passport
const passport = require('passport');

//sesion
app.use(session({ //importante inicializar la sesion al principio XD by ruben

    secret: 'projectTable',
    resave: 'false',
    saveUninitialized: 'false',
    store: new MySQLStore(database)

}));

require('./lib/passport')


//configuracion
app.set('puerto', 3000); //puerto por el que escuchara nuestra app
app.set('views', path.join(__dirname, 'views')) //le digo donde esta la carpeta views que es donde almacenara las vistas de la app

//esto es lo que hace que funcione hbs
app.engine('.hbs', handlebass({
    defaultLayout: 'main', //nombre de la plantilla por defecto, a la que llamara todas las paginas
    layoutsDir: path.join(app.get('views'), 'layouts'), //esto le dice que la carpeta layouts esta dentro de view
    partialsDir: path.join(app.get('views'), 'partials'), //carpeta de partials
    helpers: require('./lib/handlebars'),
    extname: '.hbs'
}))

app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: false })); //express aceptara datos sencillos
app.use(express.json()); //aceptar futuros jsons

//peticiones/intercambio de info
app.use(morgan('dev')); //que muestra, dev
app.use(passport.initialize());
app.use(passport.session());

//mensajes
app.use(flash());

//variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.delete = req.flash('delete');
    app.locals.edit = req.flash('edit');
    app.locals.errorPassword = req.flash('errorPassword');
    app.locals.loginOK = req.flash('loginOK');
    app.locals.ErrorLoginNoExiste = req.flash('ErrorLoginNoExiste');
    app.locals.usuario = req.user;

    console.log('sesion: ' + req.user);

    next();
});

//rutas
app.use(require('./routes/routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//archivos publicos

app.use(express.static(path.join(__dirname, 'public')));

//inicializar el server
app.listen(app.get('puerto'), () => {
    console.log('Server en funcionamiento en el puerto ' + app.get('puerto') + ', cargando');

});