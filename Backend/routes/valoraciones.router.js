var express = require('express');
var router = express.Router();

var valoracionModel = require('../model/valoracion.model');



router.put('/insertarvaloracion',(req,res)=>{
    let valoracion = {...req.body}
    valoracionModel.insertValoracion(valoracion).then(resultado=>{
        res.status(201).send({
            mensaje: 'Valoracion ingresada con exito',
            registroValoracion: true
        });
    });
});


router.get('/valoracion/:ID_USUARIO',(req,res)=>{
    valoracionModel.getValoracion(req.params.ID_USUARIO).then(resultado=>{
        if(resultado.length==0){
            return res.send(0);
        }else 
        res.send(resultado)
    })
})

module.exports={router:router}