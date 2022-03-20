
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
const randExp = require('randexp')
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


router.get('/obtenerCorreo/:correo',(req,res)=>{
    registroModel.getCorreoUsuario(req.params.correo).then(resultado=>{
        if (resultado.length ==0){
            //en caso de que el email existe, al momento que el usuario aprete de que quiere recuperar contraseña pues se enviara el correo
            return res.send(false);
        }
        return res.send(true);
    });
});

router.get('/recuperacionemail/:email', (req,res)=>{
    console.log(req.params.email);
    var random = new randExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/);
    var tempContrasena = random.gen();
    console.log(tempContrasena)
    registroModel.getCorreoUsuario(req.params.email).then(resultado=>{
        if (resultado.length ==0){
            //NO EXISTE EL EMAIL
            return res.send(false)
        }
        var emailOpt = emailConfiguration.mailOption(req.params.email,tempContrasena);
            emailConfiguration.sendEmail(emailOpt);
            bcrypt.hash(tempContrasena,10).then(hash=>{
                registroModel.updateContrasena(hash,req.params.email).then(resultado=>{
                    return res.send(true)
                })
            });
        
    });

});


module.exports={
    router : router
}