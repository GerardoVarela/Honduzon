/**
 * @author: Jvarela
 * 
 * Archivo que contendra el modelo para las queries hacia y desde las base de datos.
 * 
 */

var bdConfig = require('../config/bd-config');
const mssql = require('mssql');


async function insertUsuario(usuario){
    /**
     * Fucion que inserta el usuario. usuario es el @param, que contiene toda al informacion del usuario en forma de Json
     * Los componentes de ese Json como ser nombre, departamento, contraseña, ciudad, password, se metera a la bd por medio de un 
     * pool request con un Stored Procedure en la base de datos.
     * Posible nombre del Stored Procedure: SP_Insert_Usuario
     * 
     */
    try {
        var pool = await mssql.connect(bdConfig.config);
        let insertarUsuario = await pool.request()
        .input('NOMBRE', mssql.VarChar,usuario.formName)
        .input('APELLIDO', mssql.VarChar,usuario.formLastName)
        .input('CORREO_ELECTRONICO',mssql.VarChar,usuario.formEmail)
        .input('TELEFONO',mssql.VarChar,usuario.formPhone)
        .input('DIRECCION',mssql.VarChar,usuario.formDirection)
        .input('RESPUESTA',mssql.VarChar,usuario.formResp)
        .input('ID_DEPARTAMENTO',mssql.Int,usuario.formDept)
        .input('CONTRASENA',mssql.VarChar,usuario.formPassword)
        .input('ID_CIUDAD',mssql.Int,usuario.formCity)
        .input('ID_PREGUNTA',mssql.Int,usuario.formPreg)
        .execute('SP_INSERTAR_USUARIO'); //NO SE HA CREADO EL STORED PROCEDURE
        return insertarUsuario.recordsets;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

async function getUsuarioId(usuario){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let usuario = await pool.request()
        .input('idUsuarioInput',mssql.Int, usuario.id)
        .query('SELECT * FROM [dbo].[Usuarios] WHERE ID_USUARIO = @idUsuarioInput');
        return usuario.recordsets;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    

}

async function getCorreoUsuario(correo){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let correoUsuario = await pool.request()
        .input('correoInput',mssql.VarChar, correo)
        .query('SELECT CORREO_ELECTRONICO FROM [dbo].[Usuarios] WHERE CORREO_ELECTRONICO = @correoInput');
        return correoUsuario.recordset;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    
}

async function getPreguntaUsuario(idPregunta){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let preguntaUsuario = await pool.request()
        .input('preguntaInput',mssql.VarChar, idPregunta)
        .query('SELECT PREGUNTA FROM PREGUNTAS WHERE ID_PREGUNTA = @preguntaInput');
        pool.close(); //Prueba del close para cerrar una conexion
        return preguntaUsuario.recordset;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}



async function getUsuarios(){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let usuarios = await pool.request()
        .query('SELECT * FROM [dbo].[Usuarios] ');
        return usuarios.recordsets;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    

}


module.exports={
    insertUsuario:insertUsuario,
    getUsuarioId:getUsuarioId,
    getUsuarios:getUsuarios,
    getCorreoUsuario:getCorreoUsuario,
    getPreguntaUsuario:getPreguntaUsuario
}


