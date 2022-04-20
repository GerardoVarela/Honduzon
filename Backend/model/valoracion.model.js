var bdConfig = require ('../config/bd-config');
var mssql = require('mssql');

async function getValoracion(ID_USUARIO){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let getvaloracion = await pool.request()
        .input('ID_USUARIO',mssql.Int,ID_USUARIO)
        .query('select round(sum(valoracion)/count(VALORACION),1) AS VALORACION_USUARIO from VALORACION where ID_USUARIO=@ID_USUARIO')                
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
        .query('INSERT INTO VALORACION (ID_USUARIO,VALORACION) VALUES (@ID_USUARIO,@VALORACION)')
        return insertarValoracion.recordset;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getValoracion,
    insertValoracion
}