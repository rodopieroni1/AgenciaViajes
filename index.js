//archivo de configuracion de express
// express es como apache en aplicaciones similares
//const express = require('express');
import express from 'express'
import router from './routes/index.js'
import db from './config/db.js'
import dotenv from 'dotenv'

dotenv.config();
console.log(process.env.DB_HOST);

const app = express();

//definir el puerto
const port = process.env.PORT || 4000;

//Conectar a la BD
db.authenticate()
.then(() => console.log('BD conectada'))
.catch(error => console.log('BD No conectada'))

//Habilitar PUG
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio  = "Agencia de Viajes";
    return next();
});
//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));
//Definir Carpeta Publica
app.use(express.static('public'));

//Agregar Router
app.use('/', router);

app.listen(port, () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`)
} )