const Bree = require('bree');




const bree = new Bree({

        jobs:[{
            name:'emailLogic',
            // cron:'* * * * *',
            interval:'7 days',
            worker:{
                workerData:{
                    description:'Este job enviara emails cada semana con los anuncios de cada categoria. Este solo es una prueba.'
                }
            }
        }]
});


async function startSchedulingFunction(){
    return bree.start();
}

module.exports={
    startSchedulingFunction,
}
