/**
 * @author: JVarela
 * 
 * archivo para modelo de dpto, en el cual se haran solo gets desde la base de datos
 * 
 */


var bdConfig = require ('../config/bd-config');
var mssql = require('mssql');



async function getDepartamento(){

    try {
        let pool = await mssql.connect(bdConfig.config);
        let departamentos = await pool.request().query('SELECT * FROM DEPARTAMENTO');
        return departamentos.recordset;
    } catch (error) {
        console.log(error);
    }


}

async function getDepartamentoId(departamentoId){
    try {
        let pool = await mssql.connect(bdConfig.config);
        let departamento = await pool.request()
        .input('idDepartamentoIput', mssql.Int, departamentoId)
        .query('SELECT * FROM DEPARTAMENTO WHERE ID_DEPARTAMENTO = @idDepartamentoIput');
        return departamento.recordset;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getDepartamento : getDepartamento,
    getDepartamentoId : getDepartamentoId
}