
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

function mailOption(email){
    return {
        from:'honduzon2022@gmail.com',
        to:`${email}`,
        subject:'Recuperacion de Cuenta de Honduzon',
        text:`Hey ${email}, bienvenido a la recuperacion de contraseña, puedes dar <a href="http://localhost:4200/restore">Click Aqui</a> \n
        para recuperar tu contraseña. Si crees que es un error, no hagas nada.`
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