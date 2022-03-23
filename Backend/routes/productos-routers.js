/**
 *  @author: JVarela Jamador
 * 
 * Archivo para poner todas las web services del de los productos.
 * Aca se pondran todos
 * 
 * 
 * @param res= parametro respuesta del servidor hacia el cliente
 * @param req= parametro request o peticion del cliente al servidor.
 * 
 */

var express = require('express');
var router = express.Router();

var productoModel = require('../model/productos.model');

router.get('/',(req,res)=>{});

router.post('/guardarproducto',(req,res)=>{
    var producto = {... req.body}
    productoModel.insertProducto(producto).then(resultado=>{
        res.status(201).send({
            mensaje: 'Producto ingresado con exito',
            registroProd: true
        });
    });
});

router.get('/filtradoproducto',(req,res)=>{})

router.get('/filtrado/:detallesfiltro',(req,res)=>{
    var filtro = req.params.detallesfiltro;
    console.log(filtro);
    var filtroArray = filtro.split('&');
    var jsonFilt = {}
    for(i=0;i<filtroArray.length;i++){
        var tempfilt = filtroArray[i].split('=')
        jsonFilt[tempfilt[0]] = tempfilt[1];
    }
    console.log(jsonFilt)
    productoModel.getProductoFiltrado(jsonFilt.precioMenor,jsonFilt.precioMayor,jsonFilt.categoryID,jsonFilt.departamentoID,jsonFilt.ciudadID,jsonFilt.contador,jsonFilt.bandera).then(resultado=>{
        res.send(resultado)
    });
})

router.get('/search/:nombreProducto',(req,res)=>{

    productoModel.buscarProducto(req.params.nombreProducto).then(resultado=>{
        res.status(201).send(resultado
        
        );
    })
})

router.get('/getprodcat/:idCat',(req,res)=>{
    productoModel.getProductoPorCatId(req.params.idCat).then(resultado=>{
        
        if(resultado.length==0){
            /*
            No tiene productos la categoria
            */ 
           return res.send(false);
        }else{
            res.send(resultado)
        }
    })
})


router.delete('/borrarproducto',(req,res)=>{});


module.exports={
    router:router
}