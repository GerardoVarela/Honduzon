var express = require('express');
var router = express.Router();

var valoracionModel = require('../model/valoracion.model');



router.post('/insertarvaloracion',validacionValoracion,(req,res)=>{
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
        if(resultado[0].VALORACION_USUARIO == null){
            res.send([{
                VALORACION_USUARIO: 0
            }]);
            return ;
        }else{
            res.status(200).json(resultado);
            return;
        } 
    })
})


function validacionValoracion (req,res,next){
    let valoracion = {...req.body};
    console.log(valoracion);
    valoracionModel.existenciaValoracion(valoracion.ID_USUARIO_VALORA,valoracion.ID_USUARIO).then(resultado=>{
        console.log(resultado);
        if(resultado.length==0){
            next();
        }else{
            valoracionModel.updateValoracion(valoracion).then(resultado=>{
                res.status(200).send({
                    mensaje:'Actualizacion Valoracion ha sido Existosa',
                    updateValoracion:true
                });
                return;
            });
        } 
        
    })
}


module.exports={router:router}