const {sign, verify} = require('jsonwebtoken');
const keys = require('../config/keys.config');

const createToken = (userEmail, userPassword)=>{
    const payload = {
        email : userEmail,
        password : userPassword
    }
    const accessToken = sign(
        payload,
        keys.jwtKey
    )
    return accessToken;


    
}

const verifyToken = (res,req, next)=>{}


module.exports={
    createToken
}