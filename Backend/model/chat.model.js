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
        .input('idCurrentUser',mssql.Int,detalleChat.currentUser)
        .input('idUsuario2',mssql.Int,detalleChat.usuario2)
        .query('INSERT INTO CHAT(ID_USUARIO1, ID_USUARIO2) VALUES(@idCurrentUser,@idUsuario2)');
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
        .input('idCurrentUser',mssql.Int,idCurrentUser)
        .query('SELECT * FROM CHAT WHERE ID_USUARIO_EMISOR = @idCurrentUser');
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
async function existenciaChatEntreUsuarios(currentUser, idUser2){
    try {
        try {
            let pool = await mssql.connect(bdConfig.config);
            let existenciaChatPorUsuario = await pool.request()
            .input('currentUser',mssql.Int,currentUser)
            .input('idUser2',mssql.Int,idUser2)
            .query('SELECT * FROM CHAT WHERE ID_USUARIO1=currentUser AND ID_USUSARIO2 = @idUser2');
            return existenciaChatPorUsuario.recordset; 
        } catch (error) {
            return error;
        }
    } catch (error) {
        return error;
    }
}


module.exports={
    nuevoChat,
    getChatPorUsuario,
    existenciaChatEntreUsuarios,
}