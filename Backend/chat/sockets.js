
const chatModel = require('../model/chat.model');  

const connectionSocket = (io)=>{
    
    var chatInformation = {}
    io.on('connection',(socket)=>{

        

        socket.on('new_chat',(chatInfo)=>{
            chatInformation = {...chatInfo};

        })

        socket.on('sendMessage',(data)=>{
            socket.broadcast.emit('receiveMessage',data);
        })

    });




}