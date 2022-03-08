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
        .input('nombreCompleto', mssql.VarChar,usuario.nombre)
        .input('correoElectronico',mssql.VarChar,usuario.correo)
        .input('telefono',mssql.VarChar,usuario.telefono)
        .input('direccion',mssql.VarChar,usuario.direccion)
        .input('ciudad',mssql.VarChar,usuario.ciudad)
        .input('departamento',mssql.VarChar,usuario.departamento)
        .input('contrasena',mssql.VarChar,usuario.contrasena)
        .execute('SP_INSERTAR_USUARIO'); //STORED PROCEDURE DE PRUEBA :'V
        return insertarUsuario.recordsets;
    } catch (error) {
        console.log(error);
    }
}


module.exports={
    insertUsuario:insertUsuario
}


