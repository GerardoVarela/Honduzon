/**
 * @author Jvarela
 * 
 * model para chats y mensajes
 * 
 * 
 * 
 */


var bdConfig = require ('../config/bd-config');
var mssql = require('mssql');

/**
 * esta funcion registrara la nueva existencia de un chat en la base de datos
 * 
 */

async function nuevoChat (detalleChat){
    try {
        let pool = await mssql.connect(bdConfig.config);
        let nuevoChat = await pool.request()
        .input('',mssql.Int,detalleChat.currentUser)
        .input('',mssql.Int,detalleChat.usuario2)
        .query('');
        return nuevoChat.recordset; 
    } catch (error) {
        return error;
    }
}

/**
 * Esta funcion va a recibir la lista de chat de un usuario en especifico
 * 
 */
async function getChatPorUsuario(idCurrentUser){
    try {
        let pool = await mssql.connect(bdConfig.config);
        let chatsDeUsuario = await pool.request()
        .input('',mssql.Int,detalleChat.idCurrentUser)
        .query('');
        return chatsDeUsuario.recordset; 
    } catch (error) {
        return error;
    }
}

/*
Esta funcion va a recibir al current user y al usuario con el que se quiere comunicar
si ell chat ya existe pues retornará los datos del chat
en caso contrario, si no existe pues retornaria un dataset vacio

*/ 
async function existenciaChat(){
    try {
        
    } catch (error) {
        return error;
    }
}



module.exports={
    nuevoChat,
    getChatPorUsuario,
    existenciaChat
}