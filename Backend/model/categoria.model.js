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
        .query('INSERT INTO Categoria(NOMBRE_CATEGORIA, DESCRIPCION_CATEGORIA, ID_ADMINISTRADOR,ESTADO) VALUES (@NOMBRE_CATEGORIA,@DESCRIPCION_CATEGORIA,@ID_ADMINISTRADOR,1)'); 
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
        let darBajaCategoria = await pool.request()
        .input('ID_CATEGORIA', mssql.VarChar,idCategoria)
        .query('UPDATE Categoria SET ESTADO = 0 WHERE ID_CATEGORIA=@ID_CATEGORIA'); 
        return darBajaCategoria.recordsets;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

async function suscripcionCategoria(detalleSuscripcion){
    console.log(detalleSuscripcion)
    try {
        var pool = await mssql.connect(bdConfig.config);
        let suscripcionCategoria = await pool.request()
        .input('idUsuario', mssql.Int, detalleSuscripcion.ID_CurrentUser)
        .input('idCat', mssql.Int, detalleSuscripcion.ID_Categoria)
        .query('INSERT INTO USUARIOSxCATEGORIAS VALUES (@idUsuario,@idCat)');
        return suscripcionCategoria.recordset;
    }catch (error) {
        return error;
    }
}


async function eliminarSuscripcion(detalleSuscripcion){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let deleteSuscripcionCategoria = await pool.request()
        .input('idUsuario', mssql.Int, detalleSuscripcion.ID_CurrentUser)
        .input('idCat', mssql.Int, detalleSuscripcion.ID_Categoria)
        .query('DELETE FROM USUARIOSxCATEGORIAS WHERE ID_CATEGORIA=@idCat AND ID_USUARIO=@idUsuario');
        return deleteSuscripcionCategoria.recordset;
    }catch (error) {
        return error;
    }
}

async function renovarSuscripcionCategoria(detalleSuscripcion){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let reSuscribirCategoria = await pool.request()
        .input('idUsuario', mssql.Int, detalleSuscripcion.ID_CurrentUser)
        .input('idCat', mssql.Int, detalleSuscripcion.ID_Categoria)
        .query('UPDATE USUARIOSxCATEGORIAS SET ESTADO = 1 WHERE ID_CATEGORIA=@idCat AND ID_USUARIO = @idUsuario');
        return reSuscribirCategoria.recordset;
    }catch (error) {
        return error;
    }
}

async function obtenerSuscripcionesUsuario(detalleSuscripcion){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let obtenersuscripciones = await pool.request()
        .input('idUsuario', mssql.Int, detalleSuscripcion.ID_CurrentUser)
        .query('SELECT * FROM USUARIOSxCATEGORIAS WHERE ID_USUARIO = @idUsuario');
        return obtenersuscripciones.recordset;
    }catch (error) {
        return error;
    }
}

async function obtenerSuscripcionesdeUsuarios(nombreCat){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let obtenersuscripciones = await pool.request()
        .input('nombreCat',mssql.VarChar, nombreCat)
        .query('SELECT Categoria.NOMBRE_CATEGORIA, Usuarios.CORREO_ELECTRONICO, USUARIOSxCATEGORIAS.ID_USUARIO, USUARIOSxCATEGORIAS.ID_CATEGORIA  FROM USUARIOSxCATEGORIAS JOIN Usuarios ON Usuarios.ID_USUARIO = USUARIOSxCATEGORIAS.ID_USUARIO JOIN Categoria ON Categoria.ID_CATEGORIA = USUARIOSxCATEGORIAS.ID_CATEGORIA WHERE Categoria.NOMBRE_CATEGORIA = @nombreCat');
        return obtenersuscripciones.recordset;
    }catch (error) {
        return error;
    }
}

async function obtenerSuscripcionDeUsuario(detalleSuscripcion){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let obtenersuscripcion = await pool.request()
        .input('idUsuario', mssql.Int, detalleSuscripcion.ID_CurrentUser)
        .input('idCat', mssql.Int, detalleSuscripcion.ID_Categoria)
        .query('SELECT * FROM USUARIOSxCATEGORIAS WHERE (ID_CATEGORIA=@idCat AND ID_USUARIO = @idUsuario)');
        return obtenersuscripcion.recordset;
    }catch (error) {
        return error;
    }
}

async function obtenerTablaSuscripcion(){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let obtenersuscripcion = await pool.request()
        .query('SELECT CATEGORIA.ID_CATEGORIA,Usuarios.CORREO_ELECTRONICO,Usuarios.ID_USUARIO FROM USUARIOSxCATEGORIAS JOIN Categoria ON USUARIOSxCATEGORIAS.ID_CATEGORIA= Categoria.ID_CATEGORIA JOIN USUARIOS ON USUARIOSxCATEGORIAS.ID_USUARIO=Usuarios.ID_USUARIO GROUP BY CORREO_ELECTRONICO,CATEGORIA.ID_CATEGORIA,Usuarios.ID_USUARIO');
        return obtenersuscripcion.recordset;
    }catch (error) {
        return error;
    }
}

async function getCategoriasSuscritas(correoElectronico){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let getCategoriasSuscritas = await pool.request()
        .input('correoELectronico',mssql.VarChar, correoElectronico)
        .query('select CATEGORIA.NOMBRE_CATEGORIA from usuariosXcategorias join Categoria on usuariosxcategorias.ID_CATEGORIA=categoria.ID_CATEGORIA join usuarios on usuariosxcategorias.ID_USUARIO=usuarios.id_usuario where usuarios.CORREO_ELECTRONICO = @correoELectronico');
        return getCategoriasSuscritas.recordset;
    }catch (error) {
        return error;
    }
}

/**
 *
 * 
 * Model para lo del pdf xd
 * 
 * 
 *  
 
 */


async function obtenerProductoPorCategoria(categoriaId){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let getCategoriasSuscritas = await pool.request()
        .input('categoriaId',mssql.Int, categoriaId)
        .query('SELECT * FROM Productos WHERE Productos.ID_CATEGORIA = @categoriaId');
        return getCategoriasSuscritas.recordset;
    }catch (error) {
        return error;
    }
}

module.exports={
    insertCategoria:insertCategoria,
    obtenerCategorias:obtenerCategorias,
    obtenerCategoria:obtenerCategoria,
    editarCategoria,
    obtenerExistenciaCategoria,
    darBajaCategoria,
    suscripcionCategoria,
    eliminarSuscripcion,
    renovarSuscripcionCategoria,
    obtenerSuscripcionesUsuario,
    obtenerSuscripcionDeUsuario,
    obtenerSuscripcionesdeUsuarios,
    obtenerTablaSuscripcion,
    getCategoriasSuscritas,
    obtenerProductoPorCategoria:obtenerProductoPorCategoria
}