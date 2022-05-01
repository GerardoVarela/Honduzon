const pdf = require('html-pdf');
function plantillaPDF(nombreCategoria,products,productDescription){
    
    productos=[]
    // console.log(nombreCategoria);
    // console.log(products)
    for (var j = 0; j<products.length;j++){
        productos.push(
            `<div class="card-body">
                 <h3 class="card-title">${products[j]}</h3>
                 <p class="card-text">${productDescription[j]}</p>
             </div>
            `
        )
        
    }
    
    var contenido = `
 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
     <title>Untitled</title>
     <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.11.1/baguetteBox.min.css">
     <link rel="stylesheet" href="assets/css/styles.css">
 </head>
 <body>
     <header>
         <h1 class="display-3 text-uppercase" style="padding-right: 10px;padding-bottom: 10px;">${nombreCategoria}</h1>
     </header> 
     <div class="card-group">`+`${productos.join(' ')}`+`
         
     </div>
     
 </body>
 </html>
 `;
 productos=[]
 return contenido;
}

 
//  pdf.create(contenido).toFile(`marito.pdf`, function(err, res) {
//      if (err){
//          console.log(err);
//      } else {
//          console.log(res);
//      }
//  });

const dotenv = require('dotenv');
dotenv.config();

async function generatePdfTest(pdfTitle,content){
    //fs.createWriteStream(`${process.env.pdfPath}`+`${pdfTitle}.pdf`,'');
    pdf.create(content).toFile(`${process.env.pdfPath}`+`${pdfTitle}.pdf`, function(err, res) {
        if (err){
            console.log(err);
        } else {
            console.log(res);
        }
    });
}







module.exports={
    generatePdfTest,
    plantillaPDF
}