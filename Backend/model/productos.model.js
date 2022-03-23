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

async function getProductoFiltrado(precio1=0.00,precio2=0.00, categoria=0,departamento = 0,ciudad=0,contador=0,bandera){

    try {
       
        /*
        SI contador = 1 : se hace el switch
        Si contador = 0 : se hace la consulta del default

        si contador > 1: se hace el filtro en general 
    
        */
       if(contador==1){
           if(bandera=="categoria"){
                console.log("cat");
                var pool = await mssql.connect(bdConfig.config);
                let obtenerProductoFiltradocat = await pool.request()
                .input('IdCategoria',mssql.Int,categoria)
                .query('SELECT * FROM [dbo].[Productos] WHERE ID_CATEGORIA= @IdCategoria');
                return obtenerProductoFiltradocat.recordset;
                
           } else if(bandera=="precio"){
                console.log(precio1,precio2);
                var pool = await mssql.connect(bdConfig.config);
                let obtenerProductoFiltrado = await pool.request()
                .input('PreciomenorInput',mssql.Float,precio1)
                .input('PrecioMayorInput',mssql.Float,precio2)
                .query('SELECT * FROM [dbo].[Productos] WHERE PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput');
                console.log(obtenerProductoFiltrado.recordset)
                return obtenerProductoFiltrado.recordset;}
                
            else if (bandera=="ciudad"){
                console.log("ciu");
                console.log(ciudad)
                var pool = await mssql.connect(bdConfig.config);
                let obtenerProductoFiltradociu = await pool.request()
                .input('ciudadInput',mssql.Int,ciudad)
                .query('select * from Productos join Usuarios on Productos.ID_USUARIO=Usuarios.ID_USUARIO where usuarios.ID_CIUDAD=@ciudadInput');
                return obtenerProductoFiltradociu.recordset
            }
            
            else if(bandera=="departamento"){
                console.log(departamento)
                var pool = await mssql.connect(bdConfig.config);
                let obtenerProductoFiltradodep = await pool.request()
                .input('departamentoInput',mssql.Int,departamento)
                .query('select * from Productos join Usuarios on Productos.ID_USUARIO=Usuarios.ID_USUARIO where usuarios.ID_DEPARTAMENTO=@departamentoInput ');
                return obtenerProductoFiltradodep.recordset
            }
    
        } else if(contador>1 && contador<=4){
            console.log(departamento)
            console.log(categoria)
            console.log(ciudad)
            console.log("aqui estoy chomines soy un divergente ");
            var pool = await mssql.connect(bdConfig.config);
            let obtenerProductoFiltrados = await pool.request()
            .input('departamentoInput',mssql.Int,departamento)
            .input('ciudadInput',mssql.Int,ciudad)
            .input('IdCategoria',mssql.Int,categoria)
            .input('PreciomenorInput',mssql.Float,precio1)
            .input('PrecioMayorInput',mssql.Float,precio2)
            .query('select  Productos.NOMBRE_PRODUCTO,Productos.DESCRIPCION_PRODUCTO,Productos.CANTIDAD_PRODUCTO,IMAGENES.IMAGEN,Productos.PRECIO from Productos join Usuarios on Productos.ID_USUARIO=Usuarios.ID_USUARIO join IMAGENES ON PRODUCTOS.ID_IMAGEN=IMAGENES.ID_IMAGEN  where'+
            '(ID_CATEGORIA=@IdCategoria and PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput)'+
            'or (ID_CATEGORIA=@IdCategoria and ID_CIUDAD=@ciudadInput) or'+  
            '(ID_CATEGORIA=@IdCategoria and ID_DEPARTAMENTO=@departamentoInput)'+
            'or (PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput and ID_CIUDAD=@ciudadInput)'+ 
            'or (PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput and ID_DEPARTAMENTO=@departamentoInput)'+
            ' or (ID_CIUDAD=@ciudadInput and ID_DEPARTAMENTO=@departamentoInput)'+
            'or(ID_CATEGORIA=@IdCategoria and PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput and ID_DEPARTAMENTO=@departamentoInput) '+
            'or (ID_CATEGORIA=@IdCategoria and ID_CIUDAD=@ciudadInput and ID_DEPARTAMENTO=@departamentoInput)'+
            'or(PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput and ID_CIUDAD=@ciudadInput and ID_DEPARTAMENTO=@departamentoInput)'+
            'or(ID_CATEGORIA=@IdCategoria and PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput and ID_CIUDAD=@ciudadInput) '+
            'or(ID_CATEGORIA=@IdCategoria and PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput and ID_CIUDAD=@ciudadInput and ID_DEPARTAMENTO=@departamentoInput)');
            return obtenerProductoFiltrados.recordset
        }
        else{
        
        var pool = await mssql.connect(bdConfig.config);
        let obtenerTodosProducto = await pool.request()
            .query('select  Productos.NOMBRE_PRODUCTO,Productos.DESCRIPCION_PRODUCTO,Productos.CANTIDAD_PRODUCTO,IMAGENES.IMAGEN, Productos.PRECIO from Productos join IMAGENES ON PRODUCTOS.ID_IMAGEN=IMAGENES.ID_IMAGEN')
            return obtenerTodosProducto.recordset;
        }

   /*     .input('PrecioInput',mssql.Float,precio)
        .input('IdCategoriaInput',mssql.Int,categoria)
        .input('ciudadInput',mssql.Int,ciudad)
        .input('departamentoInput',mssql.Int,departamento) 
        .query('SELECT * FROM [dbo].[Productos] WHERE PRECIO= @PrecioInput')*/
        

    } catch (error) {
        console.log(error);
        process.exit(1);
    }



}

async function buscarProducto(producto){
    var pool = await mssql.connect(bdConfig.config);
    let obtenerProductoBuscado = await pool.request()
        .input('NOMBRE_PRODUCTO',mssql.VarChar,producto)
        .execute('SP_BUSCAR_PRODUCTO')
        return obtenerProductoBuscado.recordset
}

async function getProductoPorCatId(catId){
    /**
     * 
     * SELECT * FROM Productos inner join IMAGENES ON Productos.ID_IMAGEN = IMAGENES.ID_IMAGEN WHERE ID_CATEGORIA =
     * 
     */

    try {
        var pool = await mssql.connect(bdConfig.config);
        let obtenerProductoPorCat = await pool.request()
        .input('IdCategoria',mssql.Int,catId)
        .query('SELECT * FROM Productos inner join IMAGENES ON Productos.ID_IMAGEN = IMAGENES.ID_IMAGEN WHERE ID_CATEGORIA =@IdCategoria');
        return obtenerProductoPorCat.recordset
    } catch (error) {
        console.log(error);
    }
}



module.exports={
    insertProducto:insertProducto,
    getProductoFiltrado:getProductoFiltrado,
    buscarProducto:buscarProducto,
    getProductoPorCatId
}