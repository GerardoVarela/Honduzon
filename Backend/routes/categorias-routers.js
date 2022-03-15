/**
 *  @author: JVarela
 * 
 * Archivo para poner todas las web services de las categorias.
 * Aca se pondran todos
 * 
 * 
 * @param res= parametro respuesta del servidor hacia el cliente
 * @param req= parametro request o peticion del cliente al servidor.
 * 
 */

var express = require('express');
var router = express.Router();

var categoriaModel = require ('../model/categoria.model');


router.get('/',(req,res)=>{
    categoriaModel.obtenerCategorias().then(resultado=>{
        res.send(resultado);
    });
});

router.post('/guardar',(req,res)=>{
    const categoria ={...req.body};
    categoriaModel.insertCategoria(categoria).then(resultado=>{
        res.send({
            mensaje: 'Categoria ingresada con exito',
            registroCat: true
        })
        res.statusCode(201);
    })
});


module.exports={
    router:router
}