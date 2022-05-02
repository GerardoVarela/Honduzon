const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var metricasModel = require('../model/metricas-model');

//obtener categorias mas suscritas
router.get('/categoriasMasSuscritas',(req,res, next)=>{
    metricasModel.categoriasMasSuscritas().then(resultado=>{
        if(resultado.length==0){
            res.send(0);}
        else{
        res.status(200).json(resultado);}
    });
}
);

//obtener categorias con mas productos
router.get('/categoriasConMasProductos',(req,res, next)=>{
    metricasModel.categoriasConMasProductos().then(resultado=>{
        if(resultado.length==0){
            res.send(0);}
        else{
        res.status(200).json(resultado);}
    });
}
);

//obtener usuarios mejor valorados
router.get('/usuariosMejorValorados',(req,res, next)=>{
    metricasModel.usuariosMejorValorados().then(resultado=>{
        if(resultado.length==0){
            res.send(0);}
        else{
        res.status(200).json(resultado);}
    });
}
);

module .exports = router;