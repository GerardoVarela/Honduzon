
var categoriaModel = require ('../model/categoria.model');

function mainLogic(){
    console.log('resultado')
    categoriaModel.obtenerCategorias().then(resultado=>{
        console.log(resultado)
    })


};
module.exports={
    mainLogic
}