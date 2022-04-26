/**
 *Archivo para toda la logica del email
 * 
 * 
 *  
 */


const anuncioEmail = require('./sendAnunciosEmails');
const categoriasModel = require('../model/categoria.model');

var emails = [];
var attachments = [];
var categories = [];


function main(){
    categoriasModel.obtenerTablaSuscripcion().then((resultado)=>{
        
        
        for(var i = 0; i<resultado.length;i++){
            categories.push(resultado[i].NOMBRE_CATEGORIA);
            console.log(categories[i]);
            // categoriasModel.obtenerSuscripcionesdeUsuarios(categories[i]).then(res=>{
            //     console.log(res);
            // });
            
        }
    });
}

module.exports = {
    main
}
