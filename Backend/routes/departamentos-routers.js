/**
 *  @author: JVarela
 * 
 * Archivo para poner todas las web services del departamento.
 * 
 * @param res= parametro respuesta del servidor hacia el cliente
 * @param req= parametro request o peticion del cliente al servidor.
 * 
 */


var express = require('express');
var router = express.Router();
var departamentosModel = require ('../model/departamento.model');

router.get('/', (req, res)=>{
    
    departamentosModel.getDepartamento().then(resultado =>{
        res.json(resultado);
    });
});

router.get('/:id',(req, res)=>{
    departamentosModel.getDepartamentoId(req.params.id).then(resultado=>{
        res.json(resultado)
    });
});




module.exports={

    router:router
}