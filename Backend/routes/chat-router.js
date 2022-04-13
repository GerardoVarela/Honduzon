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

    var filtro = req.params.detalleChat;
    
    var filtroArray = filtro.split('&');
    
    var jsonFilt = {}
    for(i=0;i<filtroArray.length;i++){
        var tempfilt = filtroArray[i].split('=')
        jsonFilt[tempfilt[0]] = tempfilt[1];
    }

/*{
    NOMBRE : NOMBRE
    MENSAJES:{
        MENSAJE:'',
        USUARIOEMISOR:
    }
}*/

    chatModel.getMensajePorChat(jsonFilt.idChat).then(resultado=>{
        
        if(jsonFilt.CurrentUser==resultado[0].IDUSUARIO_1){
            console.log(resultado[0].USUARIO_2)
        }else 
            if(jsonFilt.CurrentUser==resultado[0].ID_USUSARIO2){
                console.log(resultado[0].USUARIO_1);
            
        }
        res.json(resultado)
    }
    );
});


router.post('/newchat',(req, res)=>{
    var existenciaChat = false;
    var chatInfo={
        currentUser: req.body.currentUser,
        idUser2: req.body.idUsuario2
    };
    
    console.log(chatInfo);
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