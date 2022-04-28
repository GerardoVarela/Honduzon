var express = require('express');
var router = express.Router();

var listaDeseosModel = require('../model/listaDeseo.model');

router.post('/guardarArticulo',verificacionArticuloListaDeseo,(req,res)=>{
    var productoListaDeseo = {...req.body};
    listaDeseosModel.agregarProductosListaDeseos(productoListaDeseo).then(resultado=>{
        res.json({
            suscripcion: true
        });
    })
});


router.delete('/borrarProductoListaDeseo',(req,res)=>{

});


router.put('/updateEstadoListaDeseo',(req,res)=>{
    var productoListaDeseo = {...req.body};
    listaDeseosModel.renovarProductoListaDeseo(productoListaDeseo).then(resultado=>{
        res.json({
            reSuscripcion: true
        });
    })
});

router.get('/getListaDeseoUsuario/:idUsuario',(req,res)=>{
    listaDeseosModel.getListaDeseoUsuario(req.params.idUsuario).then(resultado=>{
        res.json({
            resultado
        });
    })
});


function verificacionArticuloListaDeseo(req,res,next){
    var productoListaDeseo = {...req.body};
    listaDeseosModel.getListaVerificacionDeseosUsuario(productoListaDeseo).then(resultado=>{
        if(resultado.length==0){
            next();
        }else{
            if(resultado.length!=0 && resultado[0].ESTADO == 0){
                listaDeseosModel.renovarProductoListaDeseo(productoListaDeseo).then(resultado=>{
                    res.json({
                        suscripcion: true
                    });
                });
            }else{
                listaDeseosModel.darBajaProductoListaDeseos(productoListaDeseo).then(resultado=>{
                    res.json({
                        suscripcion: false
                    });
                });
            }
        }
    })
}


module.exports={
    router
}