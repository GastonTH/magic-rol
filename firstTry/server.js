const express = require('express');
const path = require('path');
const app = express();

//API de la aplicacion
//las rutas para acceder a lo relacionado con el usuario es la de abajo. 
app.use('/api', require('./app/routes/users.routes.js'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log(" * [ Magic Rol ] UP and Running en http://localhost:3000");
});