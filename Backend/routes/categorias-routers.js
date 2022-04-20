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

router.post('/guardar',verificacionCategoria,(req,res)=>{
    var categoria ={...req.body};
    
        categoriaModel.insertCategoria(categoria).then(resultado=>{
            res.send({
                registroCat: true
            });
    });
});




router.put('/editarCategoria/:idCategoria',(req,res)=>{
    console.log(req.params.idCategoria);
    console.log(req.body);
    var detalleCategoria = {...req.body};
    categoriaModel.editarCategoria(detalleCategoria,req.params.idCategoria).then((resultado)=>{
        res.json({
            edicionCategoria: true
        })
    })
});

router.delete('/borrarCategoria/:idCategoria',(req,res)=>{
    categoriaModel.darBajaCategoria(req.params.idCategoria).then(resultado=>{
        res.json(true);
    })
})


function verificacionCategoria(req,res,next){
    const categoria ={...req.body};
    var existenciaCategoria = true;
    categoriaModel.obtenerExistenciaCategoria(categoria.formCategoryName).then((resultado)=>{
        if(typeof(resultado) == undefined){
            res.status(500).send({
                mensaje:'Error en el servidor'
            })
        }else{
            console.log(resultado);
            if(resultado.length == 0){
                next();
            }else{
                res.json({
                    existenciaCategoria
                });
                return;
            }
        }
    })
}

module.exports={
    router:router
}