/**
 * @author: Jvarela jamador
 * 
 * Archivo que contendra el modelo para las queries hacia y desde las base de datos para los Productos.
 * 
 */

var bdConfig = require('../config/bd-config');
const mssql = require('mssql');

async function insertProducto(producto){
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
        .input('ID_IMAGEN',mssql.Int,producto.formImage)
        .execute('SP_INSERTAR_PRODUCTO');
        return insertarProducto.recordset

    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}

async function getProductoFiltrado(contador,bandera,precio1=0.00,precio2=0.00, categoria=0, ciudad=0, departamento = 0){
 

    try {
        var pool = await mssql.connect(bdConfig.config);
        let obtenerProductoFiltrado = await pool.request()
        while(numeroFiltros<=3){

        }
        /*
        SI contador = 1 : se hace el switch
        Si contador = 0 : se hace la consulta del default

        si contador > 1: se hace el filtro en general 
    
        */
        switch(bandera){
            case 'precio':
                obtenerProductoFiltrado
                .input('PreciomenorInput',mssql.Float,precio1)
                .input('PrecioMayorInput',mssql.Float,precio2)

                .query('SELECT * FROM [dbo].[Productos] WHERE PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput');
                break;                
            case 'categoria':
                obtenerProductoFiltrado 
                .input('@IdCategoria',mssql.Float,precio)
                .query('SELECT * FROM [dbo].[Productos] WHERE ID_CATEGORIA= @IdCategoria ');
                break;
                
            case 'ciudad':
                obtenerProductoFiltrado
                .input('ciudadInput',mssql.Int,ciudad)
                .query('select * from Productos join Usuarios on Productos.ID_USUARIO=Usuarios.ID_USUARIO where usuarios.ID_CIUDAD=@ciudadInput ');
                break;
                
            case 'departamento':
                obtenerProductoFiltrado
                .input('departamentoInput',mssql.Int,ciudad)
                .query('select * from Productos join Usuarios on Productos.ID_USUARIO=Usuarios.ID_USUARIO where usuarios.ID_DEPARTAMENTO=@departamentoInput ');
                break;
                    
    
            default:
                obtenerProductoFiltrado
                .query('select * from productos ');
                break;
                    
            
    
        }
   /*     .input('PrecioInput',mssql.Float,precio)
        .input('IdCategoriaInput',mssql.Int,categoria)
        .input('ciudadInput',mssql.Int,ciudad)
        .input('departamentoInput',mssql.Int,departamento) 
        .query('SELECT * FROM [dbo].[Productos] WHERE PRECIO= @PrecioInput')*/
        return obtenerProductoFiltrado.recordset
    } catch (error) {
        console.log(error);
        process.exit(1);
    }



}




module.exports={
    insertProducto:insertProducto,
    getProductoFiltrado:getProductoFiltrado
}