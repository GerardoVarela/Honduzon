var bdConfig = require ('../config/bd-config');

var mssql = require('mssql');




async function getDenunciaDeUsuario(ID_USUARIO){
    try {
        var pool = await new mssql.ConnectionPool(bdConfig).connect();
        var result = await pool.request()
            .input('ID_USUARIO', mssql.Int, idUsuario)
            .query('select * from DENUNCIAS where denunciadoID = @idUsuario');
        return result.recordset;     
    } 
            catch (error) {
                    return error;
                } 
}
    




async function insertarDenuncia(DENUNCIAS){
    try {
        let pool = await mssql.connect(bdConfig.config);
        let insertardenuncias = await pool.request()
        .input('denunciadoID', mssql.Int,denunciadoID )
        .input('denuncianteID', mssql.Int,denuncianteID )
        .input('descripcion', mssql.VarChar,descripcion )
        .input('motivo', mssql.VarChar,motivo )
        .query('insert into DENUNCIAS values (@denunciadoID,@denuncianteID,@productoID,@descripcion,@motivo)');
    
        return insertardenuncias.recordset;
    } catch (error) {
        return error;
    }
}

async function getDenuncias(){
    try {
        let pool = await mssql.connect(bdConfig.config);
        let correo = await pool.request()
        .query('select * from DENUNCIAS');
    
        return correo.recordset;
    } catch (error) {
        return error;
    }
}

async function darBajaDenuncia(idDenuncia){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let insertarCategoria = await pool.request()
        .input('idDenuncia', mssql.VarChar,idDenuncia)
        .query('UPDATE DENUNCIAS SET ESTADO = 0 WHERE denunciasID=@idDenuncia'); 
        return darBajaDenuncia.recordsets;
    } catch (error) {
        console.log(error);
        process.exit(1);
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
    insertarDenuncia,
    getDenunciaDeUsuario,
    darBajaDenuncia
    

}