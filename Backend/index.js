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
const valoraciones = require('./routes/valoraciones.router');
const admin = require('./routes/admin.routers');
const keys = require ('./config/keys.config');
const denuncias = require('./routes/denuncias.router');
const listaDeseos = require('./routes/listaDeseos.router');
const chatRouter =require('./routes/chat-router');

const scheduler = require('./jobs/jobscheduler.jobs').startSchedulingFunction();


const io = require('socket.io')(http,{
    cors:{
        origin: ['http://localhost:4200'],
        credentials:true,
        methods:['GET','POST'],
    }
});

require('./chat/sockets').connectionSocket(io);

/**
 * Middlewares: funciones que tienen acceso a los objetos:
 * -request (peticion)
 * -response (respuesta)
 */


app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('keys', keys.jwtKey);
app.use('/usuarios',registroRouters.router);
app.use ('/departamentos',obtenerDepartamentos.router);
app.use('/ciudades',obtenerCiudades.router);
app.use('/preguntas',obtenerPreguntas.router);
app.use('/login',login.router);
app.use('/categorias',categorias.router);
app.use('/productos',productos.router);
app.use('/chat', chatRouter.router);
app.use('/administrador',admin.router);
app.use('/valoraciones',valoraciones.router);
app.use('/denuncias',denuncias.router);
app.use('/wishlist',listaDeseos.router);
puerto = 8888;
// app.set('templates', path.join(__dirname,'recuperacion-constraseña'));
app.get('/',(req,res)=>{
    res.send('Servidor levantado');
})



http.listen(puerto,()=>{
    //"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$"
    
    console.log( `Servidor Backend de Honduzon escuchando al puerto:${puerto}. Abra el navegador en: http://localhost:${puerto}/`)
});