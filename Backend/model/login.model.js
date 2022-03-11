var bdConfig = require ('../config/bd-config');
var mssql = require('mssql');




async function getCorreo(Usuariocorreo){
    try {
        let pool = await mssql.connect(bdConfig.config);
        let correo = await pool.request()
        .input('correoIput', mssql.VarChar, Usuariocorreo)
        .query('SELECT CORREO_ELECTRONICO from [dbo].[Usuarios] WHERE CORREO_ELECTRONICO=@correoIput')
        
        console.log(correo.recordsets);
        return correo.recordset;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCorreo:getCorreo    
}