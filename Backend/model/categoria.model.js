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
        .input('NOMBRE_CATEGORIA', mssql.VarChar,categoria.formCategoryName)
        .input('DESCRIPCION_CATEGORIA', mssql.VarChar,categoria.formCategoryDescription)
        .input('IMAGEN_CATEGORIA',mssql.VarBinary,categoria.formImageInput)
        .input('ID_ADMINISTRADOR',mssql.Int,categoria.currentAdmin)
        .query('INSERT INTO Categoria(NOMBRE_CATEGORIA, DESCRIPCION_CATEGORIA, ID_ADMINISTRADOR) VALUES (@NOMBRE_CATEGORIA,@DESCRIPCION_CATEGORIA,@ID_ADMINISTRADOR)'); 
        return insertarCategoria.recordsets;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

async function obtenerCategorias(){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let categorias = await pool.request()
        .query('SELECT * FROM [dbo].[Categoria] where ESTADO = 1') 
        return categorias.recordset;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

async function obtenerCategoria(categoriaId){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let categorias = await pool.request()
        .input('CategoriaInput',mssql.Int,categoriaId)
        .query('SELECT * FROM [dbo].[Categoria] WHERE = @CategoriaInput') 
        return categorias.recordset;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

async function obtenerExistenciaCategoria(nombreCategoria){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let existenciaCategoria = await pool.request()
        .input('CategoriaInput',mssql.VarChar,nombreCategoria)
        .query('SELECT * FROM [dbo].[Categoria] WHERE NOMBRE_CATEGORIA= @CategoriaInput') 
        return existenciaCategoria.recordset;
    } catch (error) {
        return error;
    }
}

async function editarCategoria(detalleCategoria, categoriaId){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let insertarCategoria = await pool.request()
        .input('ID_CATEGORIA', mssql.VarChar,categoriaId)
        .input('NOMBRE_CATEGORIA', mssql.VarChar,detalleCategoria.formCategoryName)
        .input('DESCRIPCION_CATEGORIA', mssql.VarChar,detalleCategoria.formCategoryDescription)
        .input('IMAGEN_CATEGORIA',mssql.VarBinary,detalleCategoria.formImageInput)
        .input('ID_ADMINISTRADOR',mssql.Int,detalleCategoria.formAdmin)
        .query('UPDATE Categoria SET NOMBRE_CATEGORIA = @NOMBRE_CATEGORIA, DESCRIPCION_CATEGORIA = @DESCRIPCION_CATEGORIA, IMAGEN_CATEGORIA=@IMAGEN_CATEGORIA,ID_ADMINISTRADOR=@ID_ADMINISTRADOR WHERE ID_CATEGORIA=@ID_CATEGORIA'); 
        return insertarCategoria.recordsets;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

async function darBajaCategoria(idCategoria){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let insertarCategoria = await pool.request()
        .input('ID_CATEGORIA', mssql.VarChar,idCategoria)
        .query('UPDATE Categoria SET ESTADO = 0 WHERE ID_CATEGORIA=@ID_CATEGORIA'); 
        return insertarCategoria.recordsets;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports={
    insertCategoria:insertCategoria,
    obtenerCategorias:obtenerCategorias,
    obtenerCategoria:obtenerCategoria,
    editarCategoria,
    obtenerExistenciaCategoria,
    darBajaCategoria
}