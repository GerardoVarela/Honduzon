/**
 *  @author: Jamador
 * 
 * Archivo para poner todas las web services del Log in.
 * Aca se pondran todos
 * 
 * 
 * @param res= parametro respuesta del servidor hacia el cliente
 * @param req= parametro request o peticion del cliente al servidor.
 * 
 */


var express = require('express');
var router = express.Router();
var login = require('../model/login-model'); 
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require ('../config/keys.config');

router.get('/', (req, res)=>{
     //Testing

})

var logeado = false;

router.post('/',(req,res, next)=>{
    login.getCredencialesUsuario(req.body.formEmailLogin).then(resultado=>{
        
        if(resultado.length>0){
            bcrypt.compare(req.body.formPasswordLogin,resultado[0].CONTRASENA).then(match=>{
                console.log(match);
                if(resultado[0].CORREO_ELECTRONICO==req.body.formEmailLogin && 
                    match){
                        logeado = true;
                        res.send(logeado);
                    
                    // res.status(201).send( {
                    //     mensaje:"Bienvenido ",
                    //     logeado:true
                    // });
                    next(); //next llama a la siguiente funcion dentro de la peticion, ahora, esta funcion es un middleware de la peticion
                    
                }else{
                    logeado = false;
                    res.send(logeado);
                    return;
                }
            })
            
        }else {
                logeado = false;
                res.send(logeado);
                return;
                // res.status(201).send( {
                //     mensaje:"algo salio mal :(",
                //     logeado:false
                // });
        }
    });
    
},(req, res)=>{
    console.log('funca el middleware');
    login.getCredencialesUsuario(req.body.formEmailLogin).then(resultado=>{
        
        console.log(resultado);
    });
});



 
 
 router.get('/:',(req,res)=>{
   
        res.status(500);
     
    
 });
 
 
 module.exports={
     router : router
 }