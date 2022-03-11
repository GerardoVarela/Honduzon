/**
 *  @author: JVarela
 * 
 * Archivo para poner todas las web services del Log in.
 * Aca se pondran todos
 * 
 * 
 * @param res= parametro respuesta del servidor hacia el cliente
 * @param req= parametro request o peticion del cliente al servidor.
 * 
 */

var express = require('express');
var router = express.Router();
var login = require('../model/login.model'); 

router.get('/', (req, res)=>{
     //Testing
})


router.post('/',(req,res)=>{
    console.log(req.body);
    login.getCorreo(req.body.Usuariocorreo).then(resultado=>{
        res.json(resultado);
    });
});


router.get('/:id',(req,res)=>{

});


module.exports={
    router : router
}