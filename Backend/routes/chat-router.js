/**
 *  @author: JVarela,Jamador
 * 
 * Archivo para poner todas las web services del departamento.
 * 
 * @param res= parametro respuesta del servidor hacia el cliente
 * @param req= parametro request o peticion del cliente al servidor.
 * 
 */


const express = require('express');
var router = express.Router();
const chatModel = require ('../model/chat.model');
const jwt = require('jsonwebtoken');
const key = require('../config/keys.config')
const algorithms = require ('../logic/functions.logic');

router.get('/:CurrentUser', (req, res)=>{
    
    chatModel.getChatsPorUsuario(req.params.CurrentUser).then(resultado =>{
        res.json(resultado);
    });
});


router.get('/mensajes',(req, res)=>{
    chatModel.existenciaChatEntreUsuarios(req.params.CurrentUser, req.params.idUser2).then(resultado=>{
        res.json(resultado)
    });
});

router.get('/mensajesPorChat/:detalleChat',(req, res)=>{

    var tempmessage = {};
    var jsonFilt = algorithms.urlToJsonFormatter(req.params.detalleChat);
    var mensajes = [];

    chatModel.getMensajePorChat(jsonFilt.idChat).then(resultado=>{

        var chatLleno = false; 
        if(resultado.length === 0){
            res.send(chatLleno);
        }else{
            for(var i = 0 ; i< resultado.length; i++){
                console.log(i)
            }
            if(jsonFilt.CurrentUser==resultado[0].IDUSUARIO_1){
                for(var i = 0 ; i<resultado.length; i++){
                    
                    tempmessage[resultado[i].ID_USUARIO_EMISOR]=resultado[i].MENSAJE
                    
                    mensajes.push(tempmessage);
                    tempmessage={};
                }
                res.json({
                    usuario_vendedor:resultado[0].USUARIO_2,
                    mensajes
                })
            }else 
                if(jsonFilt.CurrentUser==resultado[0].IDUSUARIO_2){
                for(var i = 0 ; i<resultado.length; i++){
                    tempmessage[resultado[i].ID_USUARIO_EMISOR]=resultado[i].MENSAJE
                    
                    mensajes.push(tempmessage);
                    tempmessage={};
                }
                res.json({
                    usuario_vendedor:resultado[0].USUARIO_1,
                    mensajes
                })
                
            }
            
        }
        
    }
    );
});


router.post('/newchat',(req, res)=>{
    var existenciaChat = false;
    var chatInfo={
        currentUser: req.body.currentUser,
        idUser2: req.body.idUsuario2
    };
    chatModel.existenciaChatEntreUsuarios(chatInfo.currentUser, chatInfo.idUser2).then(resultado=>{
        
        if(resultado.length === 0){
            console.log('chat sin crear')
            chatModel.nuevoChat(chatInfo);
            existenciaChat=true;
            res.json(existenciaChat);
            return existenciaChat;

        }else{
            console.log('chat Creado')
            existenciaChat=true;
            res.json(existenciaChat);
            return existenciaChat;
        }
    });
})

//Token para despues, primero, toca verificar lo del chat 

function verify (req,res,next){
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

module.exports={
    router
}