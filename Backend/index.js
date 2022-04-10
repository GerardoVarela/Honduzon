const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const registroRouters = require('./routes/registro-routers');
const obtenerDepartamentos = require ('./routes/departamentos-routers');
const obtenerCiudades = require ('./routes/ciudad-router');
const obtenerPreguntas = require('./routes/preguntas-router');
const login = require('./routes/login-routers');
const categorias = require('./routes/categorias-routers');
const productos = require ('./routes/productos-routers');
const keys = require ('./config/keys.config');

const io = require('socket.io')(http,{
    cors:{
        origin: true,
        credentials:true,
        methods:['GET','POST'],
    }
});


/**
 * Middlewares: funciones que tienen acceso a los objetos:
 * -request (peticion)
 * -response (respuesta)
 */


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('keys', keys.jwtKey);
app.use('/usuarios',registroRouters.router);
app.use ('/departamentos',obtenerDepartamentos.router);
app.use('/ciudades',obtenerCiudades.router);
app.use('/preguntas',obtenerPreguntas.router);
app.use('/login',login.router);
app.use('/categorias',categorias.router)
app.use('/productos',productos.router)
puerto = 8888;
// app.set('templates', path.join(__dirname,'recuperacion-constraseña'));
app.get('/',(req,res)=>{
    res.send('Servidor levantado');
})



app.listen(puerto,()=>{
    //"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$"
    
    console.log( `Servidor Backend de Honduzon escuchando al puerto:${puerto}. Abra el navegador en: http://localhost:${puerto}/`)
});