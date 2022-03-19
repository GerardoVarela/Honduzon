
/**
 *  @author: JVarela
 * 
 * Archivo para poner todas las web services del registro.
 * Aca se pondran todos
 * 
 * 
 * @param res= parametro respuesta del servidor hacia el cliente
 * @param req= parametro request o peticion del cliente al servidor.
 * 
 */

var express = require('express');
var router = express.Router();
var registroModel = require('../model/registro.model');
var emailConfiguration = require('../config/email.config')
const bcrypt = require ('bcrypt');

router.get('/', (req, res)=>{
    registroModel.getUsuarios().then(resultado=>{
        res.send(resultado)
    });
})


router.post('/guardar', 
    (req,res)=>{
        
        registroModel.getCorreoUsuario(req.body.formEmail).then(resultado=>{
            if (resultado.length >0){
                console.log(resultado[0].CORREO_ELECTRONICO)
                return res.send({
                    yaRegistrado:true
                });
            }
            
            bcrypt.hash(req.body.formPassword,10).then((hash)=>{
                const usuario ={
                    nombre:req.body.formName,
                    apellido: req.body.formLastName,
                    email: req.body.formEmail,
                    telefono: req.body.formPhone,
                    direccion: req.body.formDirection,
                    ciudad: req.body.formCity,
                    departamento: req.body.formDept,
                    contrasena : hash,
                    pregunta: req.body.formPreg,
                    respuesta: req.body.formResp
                };
                registroModel.insertUsuario(usuario).then(resultado=>{
                    res.status(201).send(
                        {
                            mensaje:'usuario Registrado',
                            userValidation : true
                        }
                    )
                })
            })
            
        });
    }
);


router.get('/:id',(req,res)=>{
    registroModel.getUsuarioId(req.params.id).then(resultado=>{
        res.json(resultado)
    });
});

router.get('/recuperacionemail/:email', (req,res)=>{
    console.log(req.params.email);
    registroModel.getCorreoUsuario(req.params.email).then(resultado=>{
        if (resultado.length ==0){
            //en caso de que el email existe, al momento que el usuario aprete de que quiere recuperar contraseña pues se enviara el correo
            return res.status(500).send({
                mensaje:'No existe el correo'
            })
        }
        var emailOpt = emailConfiguration.mailOption(req.params.email);
            emailConfiguration.sendEmail(emailOpt);
            return res.status(200).send({
                mensaje:'Correo enviado con exito'
            })    
        
        
    });

});


module.exports={
    router : router
}