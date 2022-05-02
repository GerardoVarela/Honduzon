var bdConfig = require ('../config/bd-config');
var mssql = require('mssql');

async function getValoracion(ID_USUARIO){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let getvaloracion = await pool.request()
        .input('ID_USUARIO',mssql.Int,ID_USUARIO)
        .query('select count(*) AS VALORACION_USUARIO from VALORACION where ID_USUARIO=@ID_USUARIO')                
        return getvaloracion.recordset;
    } catch (error) {
        return error;
    }
}

async function insertValoracion(valoracion){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let insertarValoracion = await pool.request()
        .input('ID_USUARIO',mssql.Int,valoracion.ID_USUARIO)
        .input('VALORACION',mssql.Int,valoracion.VALORACION)
        .input('ID_USUARIO_VALORA', mssql.Int, valoracion.ID_USUARIO_VALORA)
        .query('INSERT INTO VALORACION (ID_USUARIO,VALORACION,ID_USUARIO_VALORA) VALUES (@ID_USUARIO,@VALORACION, @ID_USUARIO_VALORA)')
        return insertarValoracion.recordset;
    } catch (error) {
        return error;
    }
}

async function updateValoracion(valoracion){
    try{
        var pool = await mssql.connect(bdConfig.config);
        let updateValoracion = await pool.request()
        .input('nuevaValoracion',mssql.Int,valoracion.VALORACION)
        .input('idUsuario',mssql.Int,valoracion.ID_USUARIO)
        .input('idusuario_Valora',mssql.Int,valoracion.ID_USUARIO_VALORA)
        .query('UPDATE VALORACION SET VALORACION = @nuevaValoracion WHERE (ID_USUARIO_VALORA = @idusuario_Valora AND ID_USUARIO = @idUsuario) ')
        return updateValoracion.recordset;
    }catch(error){
        return error;
    }
}

async function existenciaValoracion(ID_USUARIO_VALORA, ID_USUARIO){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let getvaloracion = await pool.request()
        .input('ID_USUARIO_VALORA',mssql.Int,ID_USUARIO_VALORA)
        .input('ID_USUARIO',mssql.Int,ID_USUARIO)
        .query('select * from VALORACION where (ID_USUARIO_VALORA=@ID_USUARIO_VALORA AND ID_USUARIO=@ID_USUARIO) ')                
        return getvaloracion.recordset;
    } catch (error) {
        return error;
    }
}


module.exports = {
    getValoracion,
    insertValoracion,
    updateValoracion,
    existenciaValoracion
}