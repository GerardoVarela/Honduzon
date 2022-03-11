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
 
 router.get('/', (req, res)=>{
     //Testing
     
 })
 
 
var logeado = false;

router.post('/',(req,res)=>{
     login.getUsuario(req.body.formEmailLogin,req.body.formPasswordLogin).then(resultado=>{
        if(resultado.length>0){
           if(resultado[0].CORREO_ELECTRONICO==req.body.formEmailLogin && 
            resultado[0].CONTRASENA==req.body.formPasswordLogin){
                logeado = true;
                res.send(logeado);
                
                // res.status(201).send( {
                //     mensaje:"Bienvenido ",
                //     logeado:true
                // });
            }}else {
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