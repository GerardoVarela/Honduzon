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
            .input('NOMBRE', mssql.VarChar,usuario.nombre)
            .input('APELLIDO', mssql.VarChar,usuario.apellido)
            .input('CORREO_ELECTRONICO',mssql.VarChar,usuario.email)
            .input('TELEFONO',mssql.VarChar,usuario.telefono)
            .input('DIRECCION',mssql.VarChar,usuario.direccion)
            .input('RESPUESTA',mssql.VarChar,usuario.respuesta)
            .input('ID_DEPARTAMENTO',mssql.Int,usuario.departamento)
            .input('CONTRASENA',mssql.VarChar,usuario.contrasena)
            .input('ID_CIUDAD',mssql.Int,usuario.ciudad)
            .input('ID_PREGUNTA',mssql.Int,usuario.pregunta)
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

async function updateContrasena(password,email){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let usuarios = await pool.request()
        .input('nuevaContrasena',mssql.VarChar, password)
        .input('correoInput',mssql.VarChar, email)
        .query('UPDATE [dbo].[Usuarios] SET CONTRASENA = @nuevaContrasena WHERE CORREO_ELECTRONICO = @correoInput');
        return usuarios.recordsets;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


module.exports={
    insertUsuario,
    getUsuarioId,
    getUsuarios,
    getCorreoUsuario,
    getPreguntaUsuario,
    updateContrasena
}


