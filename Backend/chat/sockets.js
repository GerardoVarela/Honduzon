
const chatModel = require('../model/chat.model');  

const connectionSocket = (io)=>{
    
    var chatInformation = {};
    var messageInformation = {};
    io.on('connection',(socket)=>{
        socket.on('new_chat',(chatInfo)=>{
            chatInformation = {...chatInfo};
            chatModel.existenciaChatEntreUsuarios(chatInformation.idCurrentUser,chatInformation.idUser2).then((res)=>{
                if(res.length ==0){
                    chatModel.nuevoChat(chatInformation);
                }else{
                    if(res!=0){
                        /**
                         * Va a buscar ese chat y 
                         * va a extraer los mensajes de ese chat
                         * de la tabla chat
                         */
                        messageInformation['currentChat'] = res[0].ID_CHAT;
                    }
                }
            })
        })

        socket.on('sendMessage',(data)=>{
            messageInformation={...data};
            socket.to(chatInformation.idUsuario2).emit('receiveMessage',data);
        })

    });




}



module.exports={
    connectionSocket
}