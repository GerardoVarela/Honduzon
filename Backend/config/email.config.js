
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
        text:`Estimado cliente \n A continuacion verá un enlace para poder recuperar su cuenta. \n \n Atte. Chomin Corporation.`
    }
}


module.exports= {
    transporter:transporter,
    mailOption:mailOption
}