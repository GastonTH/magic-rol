const express = require('express');
const path = require('path');
//inicializo express
const app = express();
//handlebass para las vistas
const handlebass = require('express-handlebars');

//configuracion
app.set('puerto', 3000); //puerto por el que escuchara nuestra app
app.set('views', path.join(__dirname, 'views')) //le digo donde esta la carpeta views que es donde almacenara las vistas de la app
app.engine('.hbs', handlebass({
    defaultLayout: 'main', //nombre de la plantilla por defecto
    layoutsDir: path.join(app.get('views'), 'layouts'), //esto le dice que la carpeta layouts esta dentro de view
    partialsDir: path.join(app.get('views'), 'partials'),
    helpers: require('./lib/handlebars'),
    extname: '.hbs'
}))

app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: false })); //aceptara datos sencillos
app.use(express.json()); //aceptar futuros jsons

//peticiones
const morgan = require('morgan');
app.use(morgan('dev')); //que muestra, dev

//variables globales

app.use((req, res, next) => {
    next();
});

//rutas

app.use(require('./routes/routes'))

//archivos publicos

//inicializar el server
app.listen(app.get('puerto'), () => {
    console.log('Server en funcionamiento en el puerto ' + app.get('puerto') + ', cargando');

});