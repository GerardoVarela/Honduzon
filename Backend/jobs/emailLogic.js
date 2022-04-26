/**
 *Archivo para toda la logica del email
 * 
 * 
 *  
 */


const anuncioEmail = require('./sendAnunciosEmails');
const categoriasModel = require('../model/categoria.model');
const dotenv = require('dotenv');
dotenv.config();

var attachments = [];
var categories = [];

var usuarios = new Map();
var tempCategorias = {};
function main(){
    categoriasModel.obtenerTablaSuscripcion().then((resultado)=>{
        resultado.forEach(element => {
            usuarios.set(element.ID_USUARIO,element.CORREO_ELECTRONICO);;
            tempCategorias[element.CORREO_ELECTRONICO];
            
        });
        usuarios.forEach((key,value) => {
            categoriasModel.getCategoriasSuscritas(key).then(resultado2=>{
                tempCategorias ={}
                resultado2.forEach(elemento=>{
                    categories.push(elemento.NOMBRE_CATEGORIA);
                    tempCategorias[key]=categories;
                    
                });
                for (emailUs in tempCategorias){
                    for (categories in tempCategorias[emailUs]){
                        console.log(tempCategorias[emailUs][categories])
                        attachments.push({path:`${process.env.pdfPath}${tempCategorias[emailUs][categories]}.pdf`})
                        
                        
                    }
                    console.log(attachments);
                    var email = anuncioEmail.mailOption(emailUs,attachments);
                        anuncioEmail.sendEmail(email);
                }
                
                categories=[];
                attachments=[]
            })
            
        });
    });
}


main();

