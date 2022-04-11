/**
 *  @author: JVarela,Jamador
 * 
 * Archivo para poner todas las web services del departamento.
 * 
 * @param res= parametro respuesta del servidor hacia el cliente
 * @param req= parametro request o peticion del cliente al servidor.
 * 
 */


 var express = require('express');
 var router = express.Router();
 var chatModel = require ('../model/chat.model');

router.get('/:CurrentUser', (req, res)=>{
    
    chatModel.getChatPorUsuario(req.params.CurrentUser).then(resultado =>{
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
     chatModel.getMensajePorChat(jsonFilt.idChat).then(resultado=>{
         if(jsonFilt.CurrentUser==idUser1){
                let usuario = jsonFilt.idUser2;
         }else if(jsonFilt.CurrentUser==idUser2){
                let usuario= jsonFilt.idUser1;
         }
    res.json(resultado)
});
});
