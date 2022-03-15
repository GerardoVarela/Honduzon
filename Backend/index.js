var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var registroRouters = require('./routes/registro-routers');
var obtenerDepartamentos = require ('./routes/departamentos-routers');
var obtenerCiudades = require ('./routes/ciudad-router');
var obtenerPreguntas = require('./routes/preguntas-router');
var login = require('./routes/login-routers')
var categorias = require('./routes/categorias-routers')

/**
 * Middlewares: funciones que tienen acceso a los objetos:
 * -request (peticion)
 * -response (respuesta)
 */


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/usuarios',registroRouters.router);
app.use ('/departamentos',obtenerDepartamentos.router);
app.use('/ciudades',obtenerCiudades.router);
app.use('/preguntas',obtenerPreguntas.router);
app.use('/login',login.router);
app.use('/categorias',categorias.router)

puerto = 8888;

app.get('/',(req,res)=>{
    res.send('Servidor levantado');
})



app.listen(puerto,()=>{
    console.log( `Servidor Levantado con el puerto ${puerto}`)
});