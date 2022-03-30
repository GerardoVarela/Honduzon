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
var matchPassword = false;
router.post('/',(req,res)=>{
    login.getUsuario(req.body.formEmailLogin).then(resultado=>{
        
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
                }else{
                    logeado = false;
                    res.send(logeado);
                }
            })
            
        }else {
                logeado = false;
                res.send(logeado);

                // res.status(201).send( {
                //     mensaje:"algo salio mal :(",
                //     logeado:false
                // });
        }
    });
    
});



 
 
 router.get('/:',(req,res)=>{
   
        res.status(500);
     
    
 });
 
 
 module.exports={
     router : router
 }