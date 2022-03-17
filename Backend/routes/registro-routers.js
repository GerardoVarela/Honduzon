
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


router.get('/', (req, res)=>{
    registroModel.getUsuarios().then(resultado=>{
        res.send(resultado)
    });
})


router.post('/guardar', 
    (req,res)=>{
        const usuario ={...req.body};
        registroModel.getCorreoUsuario(req.body.formEmail).then(resultado=>{
            if (resultado.length >0){
                console.log(resultado[0].CORREO_ELECTRONICO)
                return res.status(500).send({
                    mensaje:'Error: El Email ya existe',
                    userValidation : false
                });
            }
            registroModel.insertUsuario(usuario).then(resultado=>{
                res.status(201).send(
                    {
                        mensaje:'usuario Registrado',
                        userValidation : true
                    }
                )
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
        if (resultado.length >0){
            //en caso de que el email existe, al momento que el usuario aprete de que quiere recuperar contraseña pues se enviara el correo
            var emailOpt = emailConfiguration.mailOption(req.params.email);
            emailConfiguration.sendEmail(emailOpt);
            res.status(200).send({
                mensaje:'Correo enviado con exito'
            })
        }else{
            /**
             * En caso que el usuario no existe y se tiene que redireccionar a la pagina de login
             */
            res.redirect('http://localhost:4200/');
        }
        
    });

});


module.exports={
    router : router
}