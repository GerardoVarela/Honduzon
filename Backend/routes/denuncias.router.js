var express = require('express');
var router = express.Router();

var denunciasmodel = require('../model/denuncias.model');

router.get('/getdenuncias', (req, res) => {
    denunciasmodel.getDenuncias().then((resultado) => {
        if(resultado.length == 0){
            res.json(false)
            return;
        }else{
            res.send(resultado);
        }
        
    });
}); 

router.get('/getdenuncias/:idUsuario', (req, res) => {
    denunciasmodel.getDenunciasPorUsuario(req.params.idUsuario).then((resultado) => {
        if(resultado.length==0){    
            res.send(0);
        }else
        res.send(resultado);
    });
}); 

router.post('/insertardenuncia', (req, res) => {
    let denuncia = {
        denunciadoID: req.body.denunciadoID,
        denuncianteID: req.body.denuncianteID,
        descripcion : req.body.descripcion,
        motivo: req.body.motivo
    }

    denunciasmodel.insertarDenuncia(denuncia).then((resultado) => {
        res.status(201).send({
            mensaje: 'Denuncia ingresada con exito',
            registroDenuncia: true
        });
    });
}); 

router.delete('/borrarDenuncia/:idDenuncia',(req,res)=>{
    denunciasmodel.darBajaDenuncia(req.params.idDenuncia).then(resultado=>{
        res.json(true);
    })
})

module.exports = { router: router };