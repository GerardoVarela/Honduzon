var express = require('express');
var router = express.Router();

var listaDeseosModel = require('../model/listaDeseo.model');
var logic = require('../logic/functions.logic');
router.post('/guardarArticulo',(req,res)=>{
    var productoListaDeseo = {...req.body};
    listaDeseosModel.agregarProductosListaDeseos(productoListaDeseo).then(resultado=>{
        res.json({
            suscripcion: true
        });
    })
});


router.delete('/borrarProductoListaDeseo/:detalleWishlist',(req,res)=>{
    var wishlistJson = logic.urlToJsonFormatter(req.params.detalleWishlist);
    listaDeseosModel.borrarProductoListaDeseos(wishlistJson).then(resultado=>{
        res.json({
            suscripcion: false
        })
    })
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
        if(resultado.length == 0){
            res.json({
                mensaje:'No tiene articulos en wishlist',
                empty :true
            });
        }else{
            res.json({
                resultado
            });
            return;
        }
        
    })
});




module.exports={
    router
}