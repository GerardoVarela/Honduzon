/**
 * @author: Jvarela
 * 
 * Archivo que contendra el modelo para las queries hacia y desde las base de datos para los Productos.
 * 
 */

var bdConfig = require('../config/bd-config');
const mssql = require('mssql');

async function inserProducto(producto){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let insertarProducto = await pool.request()
        .input('NOMBRE_PRODUCTO',mssql.VarChar,)
        .input('DESCRIPCION_PRODUCTO',mssql.VarChar,)
        .input('CANTIDAD_PRODUCTO',mssql.Int,)
        .input('CANTIDAD_PROD_VENDIDO',mssql.Int,)
        .input('VALORACIONES',mssql.Int,)
        .input('PRECIO',mssql.Float,)
        .input('ID_USUARIO',mssql.Int,)
        .input('ID_CATEGORIA',mssql.Int,)
        .input('IMAGEN',mssql.Image,)


    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}


module.exports={}