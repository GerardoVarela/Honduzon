var bdConfig = require ('../config/bd-config');

var mssql = require('mssql');




async function getDenunciaDeUsuario(ID_USUARIO){
    try {
        var pool = await new mssql.connect(bdConfig).connect();
        var result = await pool.request()
            .input('ID_USUARIO', mssql.Int, idUsuario)
            .query('select * from DENUNCIAS where (denunciadoID = @idUsuario AND ESTADO=1)');
        return result.recordset;     
    } 
            catch (error) {
                    return error;
                } 
}
    


async function insertarDenuncia(denuncia){
    console.log(denuncia);
    try {
        let pool = await mssql.connect(bdConfig.config);
        let insertardenuncias = await pool.request()
        .input('denunciadoID', mssql.Int,denuncia.denunciadoID)
        .input('denuncianteID', mssql.Int,denuncia.denuncianteID)
        .input('descripcion', mssql.VarChar,denuncia.descripcion)
        .input('motivo', mssql.VarChar,denuncia.motivo)
        .query('insert into DENUNCIAS(denunciadoID,denuncianteID,descripcion,motivo,ESTADO) values (@denunciadoID,@denuncianteID,@descripcion,@motivo,1)');
    
        return insertardenuncias.recordset;
    } catch (error) {
        return error;
    }
}

async function getDenuncias(){
    try {
        let pool = await mssql.connect(bdConfig.config);
        let correo = await pool.request()
        .query('select * from DENUNCIAS JOIN Usuarios ON DENUNCIAS.denunciadoID = Usuarios.ID_USUARIO AND DENUNCIAS.ESTADO = 1');
    
        return correo.recordset;
    } catch (error) {
        return error;
    }
}

async function darBajaDenuncia(idDenuncia){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let darBajaDenuncia = await pool.request()
        .input('idDenuncia', mssql.VarChar,idDenuncia)
        .query('UPDATE DENUNCIAS SET ESTADO = 0 WHERE denunciasID=@idDenuncia'); 
        return darBajaDenuncia.recordsets;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}



async function getDenuncia(id_Denuncia){
    try {
        var pool = await new mssql.connect(bdConfig).connect();
        var result = await pool.request()
            .input('id_Denuncia', mssql.Int, id_Denuncia)
            .query('select * from DENUNCIAS where denunciasID = @id_Denuncia AND ESTADO = 1');
        return result.recordset;     
    } 
            catch (error) {
                    return error;
                } 
}


async function darBajaUsuario(idUsuario){
    try {
        var pool = await mssql.connect(bdConfig.config);
        let darBajaDenuncia = await pool.request()
        .input('idUsuario', mssql.VarChar,idUsuario)
        .query('UPDATE Usuarios SET ESTADO = 0 WHERE ID_USUARIO=@idUsuario'); 
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
    darBajaDenuncia,
    getDenuncia,
    darBajaUsuario

}