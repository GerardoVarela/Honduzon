
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

function mailOption(email,attachments){
    return {
        from:'honduzon2022@gmail.com',
        to:`${email}`,
        subject:'Anuncios Semanales de tus Categorías',
        text:`Hey, estos son los anuncios de esta semana de las categorias a las que estas suscrito:\n`,
        attachments:attachments
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
    mailOption,
    sendEmail
}