var bdConfig = require ('../config/bd-config');
var mssql = require('mssql');

async function categoriasMasSuscritas(){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let categoriasMasSuscritas = await pool.request()
        .query("select top 5 count (categoria.ID_CATEGORIA),categoria.ID_CATEGORIA,categoria.NOMBRE_CATEGORIA from UsuariosxCategorias join categoria on USUARIOSxCATEGORIAS.ID_CATEGORIA=categoria.ID_CATEGORIA group by categoria.ID_CATEGORIA,categoria.nombre_categoria order by categoriaSuscrita desc     ");
        return categorias.recordset;
    } catch (error) {
        return error;
    }
}

async function cateogriasConMasProductos(){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let cateogriasConMasProductos = await pool.request()
        .query("select top 5 count (productos.ID_PRODUCTO),categoria.NOMBRE_CATEGORIA from productos join categoria on productos.id_categoria=Categoria.id_categoria group by categoria.id_categoria,categoria.nombre_categoria order by cantidadSuscritos desc       ");
        return cateogriasConMasProductos.recordset;
    } catch (error) {
        return error;
    }

}

async function usuariosMejorValorados(){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let usuariosMejorValorados = await pool.request()
        .query("select top 10 (SUM (VALORACION)/count (valoracion.id_usuario)) as valoracion,nombre,valoracion.id_usuario from valoracion join usuarios on valoracion.id_usuario=usuarios.ID_USUARIO group by usuarios.ID_USUARIO,nombre,valoracion.id_usuario order by valoracion desc ");
        return usuariosMejorValorados.recordset;
    } catch (error) {
        return error;
    }
}


module.exports = {
    categoriasMasSuscritas,
    cateogriasConMasProductos,
    usuariosMejorValorados
}