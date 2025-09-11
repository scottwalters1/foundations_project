const jwt = require("jsonwebtoken");

const {logger} = require("./logger");


async function authenticateToken(req, res, next){
    // Authorization: "Bearer tokenstring"

    const authHeader = req.headers["authorization"];
    // && syntax: if expr1 is truthy, returns expr2
    const token = authHeader && authHeader.split(" ")[1];


    if(!token){
        res.status(400).json({message: "forbidden access"});
    }else{
        const user = await decodeJWT(token);
        if(user){
            req.user = user; // You generally should not modify the incoming req
            next();
        }else{
            res.status(400).json({message: "Bad JWT"});
        }
    }
}

async function decodeJWT(token){
    try{
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        return user;
    }catch(error){
        logger.error(err);
        return null;
    }
}

module.exports = authenticateToken;
