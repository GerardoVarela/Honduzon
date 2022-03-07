
/**
 *  @author: JVarela
 * 
 * Archivo para poner todas las web services del registro.
 * Aca se pondran todos
 * 
 * 
 * @param res= parametro respuesta del servidor hacia el cliente
 * @param req= parametro request o peticion del cliente al servidor.
 * 
 */

var express = require('express');
var router = express.Router();
var usuarios = [];

router.post('/',(req,res)=>{
    //req.body -> la informacion cae ahi gracias al middleware bodyparser

    let usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        password: req.body.password
    }

    usuarios.push(usuario);
    res.send({
        mensaje: 'SIUUUUUUU',
        usuario: usuario
    })
});

module.exports={
    router : router
}