const jwt = require('jsonwebtoken');
const User = require('../models/User');

const {TokenExpiredError} =jwt;

module.exports = async (req,res,next)=>{
    const authHeader= req.get('Authorization');
    if(!authHeader){
        const error = new Error('not found access token!');
         error.statusCode = '403';
        return next(error);
    }

    const token = authHeader.split(' ')[1];
    let decodedToken ;
    try{
        decodedToken= jwt.verify(token,'secret');
    }
    catch(error){
        if (error instanceof TokenExpiredError) {
            error.statusCode = '401';
            error.message = 'Unauthorized! Access Token was expired!';
        }
        return next(error);
    }
    if(!decodedToken){
        const error = new Error('Not authenticated.');
        error.statusCode = '401';
        return next(error);
    }

    const user= await User.findOne({email: decodedToken.email});
    req.user= user;

    next();
}