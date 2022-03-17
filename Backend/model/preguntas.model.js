/**
 * @author: JVarela
 * 
 * archivo para modelo de preguntas, en el cual se haran solo gets desde la base de datos
 * 
 */


var bdConfig = require ('../config/bd-config');
var mssql = require('mssql');

async function getPreguntas(){

    try {
        let pool = await mssql.connect(bdConfig.config);
         let preguntas = await pool.request().query('SELECT * FROM PREGUNTAS');
        return preguntas.recordset;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }


}

 async function getPreguntaId(preguntaId){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let pregunta = await pool.request()
        .input('preguntaInput',mssql.VarChar, preguntaId)
        .query('SELECT PREGUNTA FROM PREGUNTAS WHERE ID_PREGUNTA = @preguntaInput');
        pool.close(); //Prueba del close para cerrar una conexion
        return pregunta.recordset;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
 }

 async function getPreguntaPorCorreo(correoUsuario){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let pregunta = await pool.request()
        .input('correoInput',mssql.VarChar, correoUsuario)
        .query('SELECT PREGUNTA FROM PREGUNTAS INNER JOIN Usuarios ON PREGUNTAS.ID_PREGUNTA = Usuarios.ID_PREGUNTA WHERE CORREO_ELECTRONICO = @correoInput');
        pool.close(); //Prueba del close para cerrar una conexion
        return pregunta.recordset;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
 }


module.exports = {
    getPreguntas : getPreguntas,
    getPreguntaPorCorreo:getPreguntaPorCorreo
    // getPreguntaId : getPreguntaId
}