const Bree = require('bree');


async function scheduleEmail(){

}

const bree = new Bree({

        jobs:[{
            name:'sendAnunciosEmails',
            // cron:'* * * * *',
            interval:'Every 10 seconds',
            worker:{
                workerData:{
                    description:'Este job enviara emails cada semana con los anuncios de cada categoria. Este solo es una prueba.'
                }
            }
        }]
});


async function startSchedulingFunction(){
    //return bree.start();
}

module.exports={
    startSchedulingFunction,
}
