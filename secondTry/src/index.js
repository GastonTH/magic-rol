const express = require('express');
const path = require('path');
//inicializo express
const app = express();
//handlebass para las vistas
const handlebass = require('express-handlebars');

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
app.use(morgan('dev')); //que muestra, dev

//variables globales

app.use((req, res, next) => {
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