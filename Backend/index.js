var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');


/**
 * Middlewares: funciones que tienen acceso a los objetos:
 * -request (peticion)
 * -response (respuesta)
 */

app.use(cors);
app.use(bodyParser.json());




puerto = 8088;

app.get('/',(req,res)=>{
    res.send('Servidor levantado');
})



app.listen(puerto,()=>{
    console.log( `Servidor Levantado con el puerto ${puerto}`)
});