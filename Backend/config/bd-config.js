/**
 * @author: jvarela
 * Archivo solamente para exportar la configuracion de la base de datos
 * 
 * 
 * NO TOCAR TODAVIA
*/

const config ={
    user: 'usuario de la bd',
    password: 'constraseña del usuario de la bd',
    server : 'ip del servidor de la base de datos',
    options:{ 
        trustedconnection: false,
        enableArthAbort: true,
        encrypt:false
    }
}



module.exports ={
    config : config
}




