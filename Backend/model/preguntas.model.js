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

// async function getPreguntaId(preguntaId){
//     
// }

module.exports = {
    getPreguntas : getPreguntas,
    // getPreguntaId : getPreguntaId
}