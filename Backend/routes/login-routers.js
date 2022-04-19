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
const token = require('../token/jwt');
const { jwtKey } = require('../config/keys.config');

router.get('/', (req, res)=>{
     //Testing

})

var logeado = false;
var createdToken = '';
var loggedUser = {}
var tempName = []
var firstName = '';
var lastName = '';
router.post('/',(req,res, next)=>{
    login.getCredencialesUsuario(req.body.formEmailLogin).then(resultado=>{
        
        if(resultado.length>0){
            bcrypt.compare(req.body.formPasswordLogin,resultado[0].CONTRASENA).then(match=>{
                
                if(resultado[0].CORREO_ELECTRONICO==req.body.formEmailLogin && 
                    match){
                        createdToken = token.createToken(req.body.formEmailLogin)
                        logeado = true;
                        res.json(createdToken);
                    
                        // res.status(201).send( {
                        //     mensaje:"Bienvenido ",
                        //     logeado:true
                        // });
                
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
    
});

router.get('/getloggeduser',verifyToken,(req,res)=>{
    jwt.verify(req.token, jwtKey,(error, authedUser)=>{
        if (error){
            res.json({
                mensaje:'Token no valido',
                tokenAutenticado: false
            });
        }else{
            login.getUsuarioLogeado(authedUser.email).then(resultado =>{
                firstName = formatNames(resultado[0].NOMBRE);
                lastName = formatNames(resultado[0].APELLIDO);

                loggedUser = {
                    nombreCompleto : firstName + ' ' + lastName,
                    idUsuario : resultado[0].ID_USUARIO,
                    imagenPerfil: resultado[0].IMAGENS
                };
                res.json(loggedUser);
            })
        }
        
    })
});
function verifyToken(req, res, next){

    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== undefined){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    }else{
        res.json({
            tokenStatus:false,
            mensaje:'No existe Token'
        }) ;
    }
}

function isAdmin(req,res,next){
    
}

function formatNames (name){
    tempName = name.split(' ');
    return tempName[0];

}
router.get('/:',(req,res)=>{

    res.status(500);
    
    
});


module.exports={
    router : router
}