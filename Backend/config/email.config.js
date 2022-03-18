
/**
 * @author Jvarela
 * 
 * archivo para almacenar toda la configuracion para enviar correos hacia el usuario
 * 
 */
const nodeMailer = require('nodemailer');


let transporter = nodeMailer.createTransport({
    service:'gmail',
    auth:{
        user:'honduzon2022@gmail.com',
        pass:'Honduzon.DT'
    },
    tls:{
        rejectUnauthorized:false
    }

})

function mailOption(email,codigo){
    return {
        from:'honduzon2022@gmail.com',
        to:`${email}`,
        subject:'Recuperacion de Cuenta de Honduzon',
        text:`Hey ${email}, bienvenido a la recuperacion de contraseña, se ha generado un codigo para que puedas recuperar tu constraseña\n codigo de recuperacion: ${codigo} \n
        Si crees que es un error, no hagas nada. \n Atte. Equipo de Honduzon`
    }
}

function sendEmail(mailOption){
    transporter.sendMail(mailOption,(error,exito)=>{
        if(error){
            console.log(error);
        }else{
            console.log('el correo se envió ');
        }
    })
}


module.exports= {
    transporter,
    mailOption,
    sendEmail
}