
var categoriaModel = require ('../model/categoria.model');
var pdfTemplate = require('../PDF/pruebasHtml');
var productos=[];

function mainLogic(){
    categoriaModel.obtenerCategorias().then(resultado=>{
        resultado.forEach(element=>{
            categoriaModel.obtenerProductoPorCategoria(element.ID_CATEGORIA).then(resultado2=>{
                //console.log(resultado2);
                resultado2.forEach(elemento=>{
                    if(element.ID_CATEGORIA==elemento.ID_CATEGORIA){
                        console.log(elemento.NOMBRE_PRODUCTO)
                    }
                    
                })
                productos.push(resultado2.NOMBRE_PRODUCTO)
                var contenido = pdfTemplate.plantillaPDF(element.NOMBRE_CATEGORIA);
            pdfTemplate.generatePdfTest(element.NOMBRE_CATEGORIA,contenido);
            });
            
            
        }) 
        
        
    })


};
mainLogic();