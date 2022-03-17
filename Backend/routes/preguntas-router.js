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
var preguntasModel = require ('../model/preguntas.model');

router.get('/', (req, res)=>{
    
    preguntasModel.getPreguntas().then(resultado =>{
        res.json(resultado);
    });
});

router.get('pregunta/:id',(req, res)=>{

});


router.get('/recuperacionquestion/:email', (req,res)=>{
    console.log(req.params.email);
    preguntasModel.getPreguntaPorCorreo(req.params.email).then(resultado=>{
        console.log(resultado[0]);
        if(resultado.length ==0){
            res.status(500).send({
                mensaje: 'El Usuario no Existe',
                registered:false
            })
        }
            var pregunta = resultado[0].PREGUNTA
            res.status(200).json(pregunta);
        
    })
});



module.exports={

    router:router
}