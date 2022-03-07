var express = require('express');
var app = express();



puerto = 8088;

app.get('/',(req,res)=>{
    res.send('Servidor levantado');
})



app.listen(puerto,()=>{
    console.log( `Servidor Levantado con el puerto ${puerto}`)
});


module.exports= {
    app:app
}
