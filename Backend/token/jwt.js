const {sign, verify} = require('jsonwebtoken');
const keys = require('../config/keys.config');

const createToken = (user)=>{
    const payload = {
        email : user.formEmailLogin,
        password : user.formPasswordLogin
    }
    const accessToken = sign(
        payload,
        keys.jwtKey
    )
    return accessToken;


    
}

const verifyToken = (res,req, next, redirectPath)=>{}


module.exports={
    createToken
}