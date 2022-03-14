/**
 * @author: Jvarela
 * 
 * Archivo que contendra el modelo para las queries hacia y desde las base de datos para los Productos.
 * 
 */

var bdConfig = require('../config/bd-config');
const mssql = require('mssql');



async function insertCategoria(categoria){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let insertarCategoria = await pool.request()
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
        return insertarCategoria.recordsets;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

async function obtenerCategorias(){

}

async function obtenerCategoria(categoriaId){

}

async function editarCategoria(categoriaId){

}