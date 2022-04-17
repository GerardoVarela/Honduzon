
function urlToJsonFormatter(params){

    var filtroArray = params.split('&');
    var filterdJson= {};
    for(i=0;i<filtroArray.length;i++){
        var tempfilt = filtroArray[i].split('=')
        filterdJson[tempfilt[0]] = tempfilt[1];
    }
    return filterdJson;
}



module.exports={
    urlToJsonFormatter,
    
}