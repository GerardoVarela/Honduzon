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
        .input('NOMBRE_PRODUCTO',mssql.VarChar,producto.formProdName)
        .input('DESCRIPCION_PRODUCTO',mssql.VarChar,producto.formDescripcion)
        .input('CANTIDAD_PRODUCTO',mssql.Int,producto.formQuantityProd)
        .input('CANTIDAD_PROD_VENDIDO',mssql.Int,producto.formQuantitySold)
        .input('VALORACIONES',mssql.Int,producto.formRanks)
        .input('PRECIO',mssql.Float,producto.formPrice)
        .input('ID_USUARIO',mssql.Int,producto.userID)
        .input('ID_CATEGORIA',mssql.Int,producto.categoryID)
        .input('IMAGEN',mssql.Image,producto.formImage)


    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}




module.exports={
    inserProducto:inserProducto
}