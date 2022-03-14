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
        .input('NOMBRE_CATEGORIA', mssql.VarChar,usuario.formCategoryName)
        .input('DESCRIPCION_CATEGORIA', mssql.VarChar,usuario.formCategoryDescription)
        .input('IMAGEN',mssql.Image,usuario.formImageInput)
        .execute('SP_INSERTAR_CATEGORIA'); //NO SE HA CREADO EL STORED PROCEDURE
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

module.exports={
    insertCategoria:insertCategoria,
    obtenerCategorias:obtenerCategorias,
    obtenerCategoria:obtenerCategoria,
    editarCategoria:editarCategoria
}