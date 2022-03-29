/**
 * @author: jvarela
 * Archivo solamente para exportar la configuracion de la base de datos
 * 
 * 
 * NO TOCAR TODAVIA
*/

/**
 * 
 * INFORMACION SOLAMENTE DE PRUEBA...
 * ### NO ME VAYAN A HACKEAR PL0X :'V... 
 * 
 */

const config ={
    user: 'sa',
    password: 'sql456',
    server : '192.168.0.16',
    database:'HONDUZON',
    port: 1433,
    options:{ 
        trustedconnection: false,
        enableArthAbort: true,
        encrypt:false
    }
}



module.exports ={
    config : config
}




