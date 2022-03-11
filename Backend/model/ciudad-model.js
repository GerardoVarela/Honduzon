/**
 * @author: JVarela
 * 
 * archivo para modelo de dpto, en el cual se haran solo gets desde la base de datos
 * 
 */


var bdConfig = require ('../config/bd-config');
var mssql = require('mssql');

async function getCiudades(){

    try {
        let pool = await mssql.connect(bdConfig.config);
        let ciudades = await pool.request().query('SELECT * FROM CIUDAD');
        return ciudades.recordset;
    } catch (error) {
        console.log(error);
    }


}

async function getCiudadId(ciudadId){
    try {
        let pool = await mssql.connect(bdConfig.config);
        let ciudad = await pool.request()
        .input('idCiudadIput', mssql.Int, ciudadId)
        .query('SELECT * FROM CIUDAD WHERE ID_CIUDAD = @idCiudadIput');
        return ciudad.recordset;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCiudades : getCiudades,
    getCiudadId : getCiudadId
}