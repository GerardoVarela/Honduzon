/**
 *  @author: JVarela
 * 
 * Archivo para poner todas las web services de las preguntas.
 * 
 * @param res= parametro respuesta del servidor hacia el cliente
 * @param req= parametro request o peticion del cliente al servidor.
 * 
 */


var express = require('express');
var router = express.Router();
var preguntasModel = require ('../model/preguntas-model');

router.get('/', (req, res)=>{
    
    preguntasModel.getPreguntas().then(resultado =>{
        res.json(resultado);
    });
});

// router.get('/:id',(req, res)=>{
//     
//     });
// });




module.exports={

    router:router
}