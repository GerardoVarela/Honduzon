 const pdf = require('html-pdf')

function plantillaPDF(nombreCategoria,products){
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
     <div class="card-group">
         <div class="card"><img class="card-img-top w-100 d-block">
             <div class="card-body">
                 <h4 class="card-title">marito</h4>
                 <p class="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.</p>
             </div>
         </div>
         <div class="card"><img class="card-img-top w-100 d-block">
             <div class="card-body">
                 <h4 class="card-title">Title</h4>
                 <p class="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.</p>
             </div>
         </div>
         <div class="card"><img class="card-img-top w-100 d-block">
             <div class="card-body">
                 <h4 class="card-title">Title</h4>
                 <p class="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.</p>
             </div>
         </div>
     </div>
     <div class="card-group">
         <div class="card"><img class="card-img-top w-100 d-block">
             <div class="card-body">
                 <h4 class="card-title">Title</h4>
                 <p class="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.</p>
             </div>
         </div>
         <div class="card"><img class="card-img-top w-100 d-block">
             <div class="card-body">
                 <h4 class="card-title">Title</h4>
                 <p class="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.</p>
             </div>
         </div>
         <div class="card"><img class="card-img-top w-100 d-block">
             <div class="card-body">
                 <h4 class="card-title">Title</h4>
                 <p class="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.</p>
             </div>
         </div>
     </div>
     <script >
        ${products}.foreach(element=>{})
     </script>
     <script src="assets/bootstrap/js/bootstrap.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.11.1/baguetteBox.min.js"></script>
 </body>
 </html>
 `;
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