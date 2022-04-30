var bdConfig = require ('../config/bd-config');
var mssql = require('mssql');



async function agregarProductosListaDeseos(detalleListaDeseo){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let agregarProductosListaDeseo =  await pool.request()
        .input('idProducto',mssql.Int,detalleListaDeseo.ID_PRODUCTO)
        .input('idUsuario',mssql.Int,detalleListaDeseo.CURRENT_USER)
        .query('INSERT INTO LISTA_DESEOS VALUES(@idProducto,@idUsuario,1)');
        return agregarProductosListaDeseo.recordset;
    } catch (error) {
        return error;
    }
}


async function getListaVerificacionDeseosUsuario(productoListaDeseo){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let obtenerListaDeseosUsuarios = await pool.request()
        .input('idUsuario',mssql.Int,productoListaDeseo.ID_USUARIO)
        .input('idProducto',mssql,productoListaDeseo.ID_PRODUCTO)
        .query('SELECT * FROM LISTA_DESEO WHERE ID_PRODUCTO=@idProducto AND ID_USUARIO=@');
        return obtenerListaDeseosUsuarios.recordset;
    } catch (error) {
        return error;
    }
}


/**
 * 
 * Para obtener la lista de deseo por usuario
 * 
 */

async function getListaDeseoUsuario(CURRENT_USER){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let obtenerListaDeseoUsuario = await pool.request()
        .input('idUsuario',mssql,CURRENT_USER)
        .query('select Productos.nombre_Producto from LISTA_DESEOS join Productos on LISTA_DESEOS.ID_PRODUCTO=productos.ID_PRODUCTO where id_usuario=@idUsuario');
        return obtenerListaDeseoUsuario.recordset
    } catch (error) {
        return error;
    }
}


async function darBajaProductoListaDeseos(detalleListaDeseo){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let darBajaProductoListaDeseo =  await pool.request()
        .input('idProducto',mssql.Int,detalleListaDeseo.ID_PRODUCTO)
        .input('idUsuario',mssql.Int,detalleListaDeseo.CURRENT_USER)
        .query('UPDATE LISTA_DESEOS SET ESTADO = 0 WHERE ID_USUARIO=@idUsuario AND ID_PRODUCTO= @idProducto');
        return darBajaProductoListaDeseo.recordset;
    } catch (error) {
        return error;
    }
}

async function renovarProductoListaDeseo(detalleListaDeseo){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let darBajaProductoListaDeseo =  await pool.request()
        .input('idProducto',mssql.Int,detalleListaDeseo.ID_PRODUCTO)
        .input('idUsuario',mssql.Int,detalleListaDeseo.CURRENT_USER)
        .query('UPDATE LISTA_DESEOS SET ESTADO = 1 WHERE ID_USUARIO=@idUsuario AND ID_PRODUCTO= @idProducto');
        return darBajaProductoListaDeseo.recordset;
    } catch (error) {
        return error;
    }
}

async function borrarProductoListaDeseos(detalleListaDeseo){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let borrarProductoListaDeseo =  await pool.request()
        .input('idProducto',mssql.Int,detalleListaDeseo.ID_PRODUCTO)
        .input('idUsuario',mssql.Int,detalleListaDeseo.CURRENT_USER)
        .query('DELETE FROM LISTA_DESEOS WHERE ID_USUARIO=@idUsuario AND ID_PRODUCTO= @idProducto');
        return borrarProductoListaDeseo.recordset;
    } catch (error) {
        return error;
    }
}


module.exports={
    agregarProductosListaDeseos,
    darBajaProductoListaDeseos,
    borrarProductoListaDeseos,
    getListaVerificacionDeseosUsuario,
    renovarProductoListaDeseo,
    getListaDeseoUsuario
}