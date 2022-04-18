
const chatModel = require('../model/chat.model');

const connectionSocket = (io)=>{

    var usersOnline = {};
    var messageInformation = {};
    var socketusers={

    }
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
        socket.on('new_connection',(user)=>{
            console.log(`New ${user} connected with the id`, socket.id);
            io.emit('user_connected', socket.id)
        });
        socket.on('sendMessage',(data)=>{

            usersOnline[parseInt(data.currentUser)] = socket.id;

            var existencia = {
                currentUser : parseInt(data.currentUser),
                idUser2 : data.idUsuario2
            };
            console.log(existencia)
            console.log(usersOnline);
            chatModel.existenciaChatEntreUsuarios(existencia.currentUser,existencia.idUser2).then((respuesta)=>{
                messageInformation={
                    currentUser: parseInt(data.currentUser),
                    message: data.message,
                    currentChat:respuesta[0].ID_CHAT
                };
                //messageInformation['currentChat'] = res[0].ID_CHAT;
                //console.log(messageInformation);
                chatModel.insertarMensajesPorUsuario(messageInformation);
            });
            // console.log(existencia.currentUser)
            // console.log(existencia.idUser2)
            // socket.to(existencia.idUser2).emit('receiveMessage',{
            //     data,

            //     from: socket.id
            // });
            for(key in usersOnline ){

                if(data.idUsuario2 == key){
                    var to = usersOnline[data.idUsuario2]
                }
            }
            //socket.to(to).emit('receiveMessage',data);
            socket.broadcast.emit('receiveMessage',data);
        })

    });




}



module.exports={
    connectionSocket
}
