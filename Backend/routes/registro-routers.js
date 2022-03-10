
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
var registro = require('../model/registro.model'); 

router.get('/', (req, res)=>{
    //Testing
    
})


router.post('/guardar',(req,res)=>{
    let usuario ={...req.body};
    registro.insertUsuario(usuario).then(resultado=>{
        res.send(201,{
            mensaje: 'Usuario se ha Ingresado Exitosamente'
        });
        
    });
});


router.get('/:id',(req,res)=>{
    
});


module.exports={
    router : router
}