
var categoriaModel = require ('../model/categoria.model');
var pdfTemplate = require('../PDF/pruebasHtml');
var productos=[];

function mainLogic(){
    categoriaModel.obtenerCategorias().then(resultado=>{
        resultado.forEach(element=>{
            categoriaModel.obtenerProductoPorCategoria(element.ID_CATEGORIA).then(resultado2=>{
                for (var i=0; i<resultado2.length;i++){
                    if(element.ID_CATEGORIA==resultado2[i].ID_CATEGORIA){
                        productos.push(resultado2[i].NOMBRE_PRODUCTO)
                        
                    }
                }
                //console.log(productos);
                var contenido = pdfTemplate.plantillaPDF(element.NOMBRE_CATEGORIA,productos);
                pdfTemplate.generatePdfTest(element.NOMBRE_CATEGORIA,contenido);
                productos = [];
            });
            
            
        }) 
        
        
    })


};
mainLogic();