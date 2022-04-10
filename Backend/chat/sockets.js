
const chatModel = require('../model/chat.model');  

const connectionSocket = (io)=>{
    
    var chatInformation = {}
    io.on('connection',(socket)=>{

        

        socket.on('new_chat',(chatInfo)=>{
            chatInformation = {...chatInfo};

        })

        socket.on('sendMessage',(data)=>{
            socket.to(idUsuario2).emit('receiveMessage',data);
        })

    });




}