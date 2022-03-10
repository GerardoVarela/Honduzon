/**
 *  @author: JVarela
 * 
 * Archivo para poner todas las web services del ciudad.
 * 
 * @param res= parametro respuesta del servidor hacia el cliente
 * @param req= parametro request o peticion del cliente al servidor.
 * 
 */


var express = require('express');
var router = express.Router();
var ciudadModel = require ('../model/ciudad.model');

router.get('/', (req, res)=>{
    
    ciudadModel.getCiudades().then(resultado =>{
        res.json(resultado);
    });
});

router.get('/:id',(req, res)=>{
    ciudadModel.getCiudadId(req.params.id).then(resultado=>{
        res.json(resultado)
    });
});




module.exports={

    router:router
}