const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");

const validateToken = asynchandler(
    (req,res,next) => {
        let token;
        const header = req.headers.authorization || req.headers.Authorization;
        
        if(header && header.startsWith("Bearer ")){
            token = header.split(" ")[1];

            jwt.verify(token,process.env.JWT_SECRET_KEY, (err,decoded) => {
                if(err){
                    res.status(401);
                    throw new Error("User is not authorized");
                }

                req.user = decoded.user;
                next();
            });
        }
        else{
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }

    }
);


module.exports = validateToken;