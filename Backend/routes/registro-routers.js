
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


router.post('/guardar',(req,res)=>{
    const usuario ={...req.body};
    
        console.log('No se Repite')
        registroModel.insertUsuario(usuario).then(resultado=>{
            res.send(201,{
                mensaje: 'Usuario se ha Ingresado Exitosamente'
        });
        
        });
});


router.get('/:id',(req,res)=>{
    registroModel.getUsuarioId(req.params.id).then(resultado=>{
        res.json(resultado)
    });
});


module.exports={
    router : router
}