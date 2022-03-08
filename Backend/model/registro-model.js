/**
 * @author: Jvarela
 * 
 * Archivo que contendra el modelo para las queries hacia y desde las base de datos.
 * 
 */

var config = require('../config/bd-config');
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
        var pool = await mssql.connect(config);
        let insertarUsuario = await pool.request()
        .input()
        .input()
        .input()
        .input()
        .input()
        .input()
        .input()
        .execute(' SP_INSERTAR_USUARIO');
        return insertUsuario.recordsets;
    } catch (error) {
        console.log(error);
        pool.close();
        return error;
    }


}




