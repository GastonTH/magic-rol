const express = require('express');
const path = require('path');
//inicializo express
const app = express();
//handlebass para las vistas
const handlebass = require('express-handlebars');
//mensajes
const flash = require('connect-flash');
//sesiones para flash
const sesion = require('express-session');
//exportar la conexion a la base de datos
const { database } = require('./db.config');

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

//peticiones
const morgan = require('morgan');
const MySQLStore = require('express-mysql-session');
app.use(morgan('dev')); //que muestra, dev

//mensajes
app.use(flash());

//sesion
app.use(sesion({

    secret: 'noct0',
    resave: 'false',
    saveUninitialized: 'false',
    store: new MySQLStore(database)

}));

//variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.delete = req.flash('delete');
    app.locals.edit = req.flash('edit');
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