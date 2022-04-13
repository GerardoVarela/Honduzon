
const chatModel = require('../model/chat.model');  

const connectionSocket = (io)=>{
    
    var chatInformation = {};
    var messageInformation = {};
    
    io.on('connection',(socket)=>{
        // let nuevoChatCreado = false;
        // socket.on('new_chat',(chatInfo)=>{
        //     chatInformation = {...chatInfo};
        //     console.log(chatInformation)
        //     chatModel.existenciaChatEntreUsuarios(chatInformation.currentUser,chatInformation.idUser2).then((res)=>{
                
        //         if(res.length ===0){
        //             chatModel.nuevoChat(chatInformation);
                    
        //         }
        //         else{
        //             if(res.length!==0){
        //                 messageInformation['currentChat'] = res[0].ID_CHAT;
        //         //         /**
        //         //          * Va a buscar ese chat y 
        //         //          * va a extraer los mensajes de ese chat
        //         //          * de la tabla chat
        //         //          */
        //         //         messageInformation['currentChat'] = res[0].ID_CHAT;
                        
                        
        //         //         chatModel.insertarMensajesPorUsuario(messageInformation);
        //             }
        //         // }
        //         // if(nuevoChatCreado){
        //         //     console.log('Nuevo Current Chat');
        //         //     chatModel.existenciaChatEntreUsuarios(chatInformation.idCurrentUser,chatInformation.idUser2).then((res)=>{
        //         //         messageInformation['currentChat'] = res[0].ID_CHAT;
        //         //         chatModel.insertarMensajesPorUsuario(messageInformation);
        //         //     })
        //         }
        //     });

        //     if(nuevoChatCreado){
        //         console.log('Nuevo Current Chat');
        //     }



       // })

        socket.on('sendMessage',(data)=>{
            var socketusers={

            }
            socketusers[data.currentUser] = socket.id;
            var existencia = {
                currentUser : data.currentUser,
                idUser2 : data.idUsuario2
            };
            console.log(existencia);
            chatModel.existenciaChatEntreUsuarios(existencia.currentUser,existencia.idUser2).then((res)=>{
                 //console.log(res)
                messageInformation={
                    currentUser: data.currentUser,
                    message: data.message,
                    currentChat:res[0].ID_CHAT
                };
                //messageInformation['currentChat'] = res[0].ID_CHAT;
                //console.log(messageInformation);
                //chatModel.insertarMensajesPorUsuario(messageInformation);
            });
            console.log(existencia.currentUser)
            console.log(existencia.idUser2)
            //socket.broadcast.emit('receiveMessage',data);
           
            socket.to(chatInformation.idUsuario2).emit('receiveMessage',data);
        })

    });




}



module.exports={
    connectionSocket
}