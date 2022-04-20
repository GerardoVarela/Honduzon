var bdConfig = require ('../config/bd-config');

var mssql = require('mssql');




async function getDenuncias(){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let listaDenuncias = await pool.request()
        .input('',mssql.VarChar, )
        .query('');
        
        return listaDenuncias.recordset;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }}
    




async function insertarDenuncia(detalleDenuncia){
    try {
        let pool = await mssql.connect(bdConfig.config);
        let insertDenuncia = await pool.request()
        .input('', mssql.VarChar, )
        .query('');
    
        return insertDenuncia.recordset;
    } catch (error) {
        return error;
    }
}

async function getDenunciaDeUsuario(idDenuncia){
    try {
        let pool = await mssql.connect(bdConfig.config);
        let correo = await pool.request()
        .input('', mssql.VarChar, )
        .query('');
    
        return correo.recordset;
    } catch (error) {
        return error;
    }
}

/**
 * 
 * Opcional 
 * 
 */

async function filtradoDenuncia(){
    try {
        let pool = await mssql.connect(bdConfig.config);
        let correo = await pool.request()
        .input('correoIput', mssql.VarChar, Usuariocorreo)
        .query('select Usuarios.CORREO_ELECTRONICO, Usuarios.CONTRASENA from Usuarios where Usuarios.CORREO_ELECTRONICO=@correoIput');
    
        return correo.recordset;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getDenuncias,
    

}