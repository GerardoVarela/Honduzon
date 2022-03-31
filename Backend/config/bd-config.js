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

const dotenv = require('dotenv');
dotenv.config();

const config ={
    user: 'sa',
    password: process.env.PASSWORD,
    server : process.env.IP,
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




