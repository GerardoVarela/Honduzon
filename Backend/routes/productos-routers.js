/**
 *  @author: JVarela
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
        res.send({
            mensaje: 'Producto ingresada con exito',
            registroCat: true
        })
        res.statusCode(201);
    });
});

router.get('/filtradoproducto',(req,res)=>{})

router.delete('/borrarproducto',(req,res)=>{});


