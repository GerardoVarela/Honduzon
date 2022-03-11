
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
var registroModel = require('../model/registro.model'); 



router.get('/', (req, res)=>{
    registroModel.getUsuarios().then(resultado=>{
        res.send(resultado)
    });
})


router.post('/guardar', 
    (req,res)=>{
        const usuario ={...req.body};
        registroModel.getCorreoUsuario(req.body.formEmail).then(resultado=>{
            if (resultado.length >0){
                console.log(resultado[0].CORREO_ELECTRONICO)
                return res.send(500,{
                    mensaje:'Error: El Email ya existe',
                    userValidation : false
                });
            }
            registroModel.insertUsuario(usuario).then(resultado=>{
                res.send(201,
                    {
                        mensaje:'usuario Registrado',
                        userValidation : true
                    }
                )
            })
        });
    }
);


router.get('/:id',(req,res)=>{
    registroModel.getUsuarioId(req.params.id).then(resultado=>{
        res.json(resultado)
    });
});


module.exports={
    router : router
}