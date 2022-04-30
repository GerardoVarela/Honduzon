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
        .query('INSERT INTO PRODUCTOS (NOMBRE_PRODUCTO,DESCRIPCION_PRODUCTO,CANTIDAD_PRODUCTO,CANTIDAD_PROD_VENDIDO,VALORACIONES,'+
            'PRECIO,ID_USUARIO,ID_CATEGORIA,ID_IMAGEN,FECHA) VALUES(@NOMBRE_PRODUCTO,@DESCRIPCION_PRODUCTO,@CANTIDAD_PRODUCTO,@CANTIDAD_PROD_VENDIDO,@VALORACIONES,'+   
            '@PRECIO,@ID_USUARIO,@ID_CATEGORIA,@ID_IMAGEN,GETDATE())')
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
                .query('select * from Productos join Usuarios on Productos.ID_USUARIO=Usuarios.ID_USUARIO where ID_DEPARTAMENTO = @departamentoInput ');
                return obtenerProductoFiltradodep.recordset
            }
    
        } else if(contador == 2){
             //CONSULTAS DOBLES

                var pool = await mssql.connect(bdConfig.config);
                let obtenerProductoFiltrados = await pool.request()
                .input('departamentoInput',mssql.Int,departamento)
                .input('ciudadInput',mssql.Int,ciudad)
                .input('IdCategoria',mssql.Int,categoria)
                .input('PreciomenorInput',mssql.Float,precio1)
                .input('PrecioMayorInput',mssql.Float,precio2)
                .query('select Productos.ID_USUARIO Productos.NOMBRE_PRODUCTO,Productos.DESCRIPCION_PRODUCTO,Productos.CANTIDAD_PRODUCTO,IMAGENES.IMAGEN,Productos.PRECIO, Productos.ID_PRODUCTO, Productos.ID_CATEGORIA from Productos join Usuarios on Productos.ID_USUARIO=Usuarios.ID_USUARIO join IMAGENES ON PRODUCTOS.ID_IMAGEN=IMAGENES.ID_IMAGEN  where'+
                '(ID_CIUDAD=@ciudadInput and ID_DEPARTAMENTO=@departamentoInput)'+
                'OR (ID_CATEGORIA=@IdCategoria and (PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput))'+
                'or (ID_CATEGORIA=@IdCategoria and ID_DEPARTAMENTO=@departamentoInput)'+
                'or ((PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput) and ID_CIUDAD=@ciudadInput)'+
                'or ((PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput) and ID_DEPARTAMENTO=@departamentoInput)'+
                'or (ID_CIUDAD=@ciudadInput and ID_DEPARTAMENTO=@departamentoInput)'+
                'or (ID_CATEGORIA=@IdCategoria and ID_CIUDAD=@ciudadInput)'
                );
                return obtenerProductoFiltrados.recordset

            // if(departamento>0 && categoria>0 && ciudad > 0){
            //     console.log(departamento)
            // console.log(categoria)
            // console.log(ciudad)
            // console.log("aqui estoy chomines soy un divergente ");
            // var pool = await mssql.connect(bdConfig.config);
            // let obtenerProductoFiltrados = await pool.request()
            // .input('departamentoInput',mssql.Int,departamento)
            // .input('ciudadInput',mssql.Int,ciudad)
            // .input('IdCategoria',mssql.Int,categoria)
            // .input('PreciomenorInput',mssql.Float,precio1)
            // .input('PrecioMayorInput',mssql.Float,precio2)
            // .query('select  Productos.NOMBRE_PRODUCTO,Productos.DESCRIPCION_PRODUCTO,Productos.CANTIDAD_PRODUCTO,IMAGENES.IMAGEN,Productos.PRECIO from Productos join Usuarios on Productos.ID_USUARIO=Usuarios.ID_USUARIO join IMAGENES ON PRODUCTOS.ID_IMAGEN=IMAGENES.ID_IMAGEN  where(ID_CIUDAD=@ciudadInput and ID_DEPARTAMENTO=@departamentoInput)');
            // return obtenerProductoFiltrados.recordset
            // }
            // console.log(departamento)
            // console.log(categoria)
            // console.log(ciudad)
            // console.log("aqui estoy chomines soy un divergente ");
            // var pool = await mssql.connect(bdConfig.config);
            // let obtenerProductoFiltrados = await pool.request()
            // .input('departamentoInput',mssql.Int,departamento)
            // .input('ciudadInput',mssql.Int,ciudad)
            // .input('IdCategoria',mssql.Int,categoria)
            // .input('PreciomenorInput',mssql.Float,precio1)
            // .input('PrecioMayorInput',mssql.Float,precio2)
            // .query('select  Productos.NOMBRE_PRODUCTO,Productos.DESCRIPCION_PRODUCTO,Productos.CANTIDAD_PRODUCTO,IMAGENES.IMAGEN,Productos.PRECIO from Productos join Usuarios on Productos.ID_USUARIO=Usuarios.ID_USUARIO join IMAGENES ON PRODUCTOS.ID_IMAGEN=IMAGENES.ID_IMAGEN  where'+
            // '(ID_CATEGORIA=@IdCategoria and (PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput))'+
            // 'or (ID_CATEGORIA=@IdCategoria and (PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput) and ID_DEPARTAMENTO=@departamentoInput) '+
            /*'or (ID_CATEGORIA=@IdCategoria and ID_CIUDAD=@ciudadInput and ID_DEPARTAMENTO=@departamentoInput)'+*/
            // 'or ((PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput) and ID_CIUDAD=@ciudadInput and ID_DEPARTAMENTO=@departamentoInput)'+
            // 'or (ID_CATEGORIA=@IdCategoria and (PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput) and ID_CIUDAD=@ciudadInput) '+
            // 'or (ID_CATEGORIA=@IdCategoria and (PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput) and ID_CIUDAD=@ciudadInput and ID_DEPARTAMENTO=@departamentoInput)');
            // return obtenerProductoFiltrados.recordset
        } else if(contador == 3){
            var pool = await mssql.connect(bdConfig.config);
                let obtenerProductoFiltrados = await pool.request()
                .input('departamentoInput',mssql.Int,departamento)
                .input('ciudadInput',mssql.Int,ciudad)
                .input('IdCategoria',mssql.Int,categoria)
                .input('PreciomenorInput',mssql.Float,precio1)
                .input('PrecioMayorInput',mssql.Float,precio2)
                .query('select  Productos.NOMBRE_PRODUCTO,Productos.DESCRIPCION_PRODUCTO,Productos.CANTIDAD_PRODUCTO,IMAGENES.IMAGEN,Productos.PRECIO, Productos.ID_PRODUCTO, Productos.ID_CATEGORIA from Productos join Usuarios on '+
                'Productos.ID_USUARIO=Usuarios.ID_USUARIO join IMAGENES ON PRODUCTOS.ID_IMAGEN=IMAGENES.ID_IMAGEN  where'+
                '(ID_CATEGORIA=@IdCategoria and PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput and ID_CIUDAD=@ciudadInput)or'+
                '(ID_CATEGORIA=@IdCategoria and PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput and ID_DEPARTAMENTO=@departamentoInput)or'+
                '(ID_CATEGORIA=@IdCategoria and ID_CIUDAD=@ciudadInput and ID_DEPARTAMENTO=@departamentoInput)or'+
                '(PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput and ID_CIUDAD=@ciudadInput and ID_DEPARTAMENTO=@departamentoInput)');
                return obtenerProductoFiltrados.recordset
        }
        else if(contador == 4){
            /**
             *  (ID_CATEGORIA=@IdCategoria and (PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput) and ID_CIUDAD=@ciudadInput and ID_DEPARTAMENTO=@departamentoInput)');
             */
                var pool = await mssql.connect(bdConfig.config);
                let obtenerProductoFiltrados = await pool.request()
                .input('departamentoInput',mssql.Int,departamento)
                .input('ciudadInput',mssql.Int,ciudad)
                .input('IdCategoria',mssql.Int,categoria)
                .input('PreciomenorInput',mssql.Float,precio1)
                .input('PrecioMayorInput',mssql.Float,precio2)
                .query('select  Productos.NOMBRE_PRODUCTO,Productos.DESCRIPCION_PRODUCTO,Productos.CANTIDAD_PRODUCTO,IMAGENES.IMAGEN,Productos.PRECIO from Productos join Usuarios on '+
                    'Productos.ID_USUARIO=Usuarios.ID_USUARIO join IMAGENES ON PRODUCTOS.ID_IMAGEN=IMAGENES.ID_IMAGEN  where'+
                    '(ID_CATEGORIA=@IdCategoria and (PRECIO<=@PrecioMayorInput and Precio>=@PreciomenorInput) and ID_CIUDAD=@ciudadInput and ID_DEPARTAMENTO=@departamentoInput)'
                );
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
    try {
        var pool = await mssql.connect(bdConfig.config);
        let obtenerProductoBuscado = await pool.request()
        .input('NOMBRE_PRODUCTO',mssql.VarChar,producto)
        .execute('SP_BUSCAR_PRODUCTO')
        return obtenerProductoBuscado.recordset;
    } catch (error) {
        return error;
    }
    
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

async function getProductoPorId (productoId){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let getProducto = await pool.request()
        .input('idProductoInput',mssql.Int,productoId)
        .query('SELECT Productos.ID_CATEGORIA, Productos.NOMBRE_PRODUCTO, Productos.DESCRIPCION_PRODUCTO, Productos.CANTIDAD_PRODUCTO, Productos.CANTIDAD_PROD_VENDIDO, Productos.PRECIO, IMAGENES.IMAGEN, Usuarios.NOMBRE, Usuarios.APELLIDO, Usuarios.ID_USUARIO, DEPARTAMENTO.NOMBRE_DEPARTAMENTO,  Usuarios.IMAGENS FROM Productos JOIN IMAGENES ON Productos.ID_IMAGEN = IMAGENES.ID_IMAGEN JOIN Usuarios ON Productos.ID_USUARIO = Usuarios.ID_USUARIO JOIN DEPARTAMENTO ON Usuarios.ID_DEPARTAMENTO = DEPARTAMENTO.ID_DEPARTAMENTO WHERE Productos.ID_PRODUCTO = @idProductoInput AND Productos.ESTADO=1 ')
        return getProducto.recordset;
    } catch (error) {
        return error;
    }
}

async function getCantTotalProdUsuario (idUsuario){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let insertarProducto = await pool.request()
        .input('idUsuario',mssql.Int,idUsuario)
        .query('SELECT COUNT(*) AS \'CantTot\' FROM Productos WHERE ID_USUARIO = @idUsuario')
        return insertarProducto.recordset;
    } catch (error) {
        return error;
    }


}



async function darBajaProducto(idProducto){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let darBajaProd = await pool.request()
        .input('idProducto', mssql.Int, idProducto)
        .query('UPDATE Productos SET ESTADO = 0 WHERE ID_PRODUCTO = @idProducto');
        return darBajaProd.recordset;
    } catch (error) {
        return error;
    }
}




module.exports={
    /*
    con ES6, cuando se exporta las funciones con mismo nombre, se puede solo poner el nombre de la funcion
    no da error
    */
    insertProducto,
    getProductoFiltrado,
    buscarProducto,
    getProductoPorCatId,
    getProductoPorId,
    getCantTotalProdUsuario,
    
}