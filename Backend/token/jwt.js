const {sign, verify} = require('jsonwebtoken');
const { authenticate } = require('passport');
const keys = require('../config/keys.config');

function createToken(userEmail){
    const payload = {
        email : userEmail
    }
    const accessToken = sign(
        payload,
        keys.jwtKey
    )
    return accessToken;
}



module.exports={
    createToken
}