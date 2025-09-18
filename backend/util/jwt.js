const jwt = require("jsonwebtoken");
const { getToken } = require("../util/token");

const {logger} = require("./logger");


async function authenticateToken(req, res, next){
    // Authorization: "Bearer tokenstring"

    const authHeader = req.headers["authorization"];
    // && syntax: if expr1 is truthy, returns expr2

    // uncomment once frontend feeds in token
    // const token = authHeader && authHeader.split(" ")[1];

    // development purposes
    const token = getToken();
    // console.log(token);

    // maybe get token from cookie here


    if(!token){
        return res.status(401).json({message: "forbidden access"});
    }else{
        const user = await decodeJWT(token);
        if(user){
            req.user = user; // You generally should not modify the incoming req
            next();
        }else{
            return res.status(400).json({message: "Bad JWT"});
        }
    }
}

async function decodeJWT(token){
    try{
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        return user;
    }catch(err){
        logger.error(err);
        return null;
    }
}

module.exports = authenticateToken;
