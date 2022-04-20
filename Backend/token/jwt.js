const {sign, verify} = require('jsonwebtoken');
const { authenticate } = require('passport');
const keys = require('../config/keys.config');

function createToken(userEmail,userType){
    if(userType === true){
        const payload = {
            email : userEmail,
        };
        const accessToken = sign(
            payload,
            keys.adminJwtKey
        );
        return accessToken;
    }else{
        const payload = {
            email : userEmail
        };
        const accessToken = sign(
            payload,
            keys.jwtKey
        );
        return accessToken;
    }
}



module.exports={
    createToken
}