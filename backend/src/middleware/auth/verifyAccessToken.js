require('dotenv').config();
const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const SECRET = process.env.ACCESS_TOKEN_SECRET;

// const verifyAccessToken = async (req, res, next) => {
//     // const username = req.body.username;
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if(token == null) return res.status(401);
//     jwt.verify(token, SECRET, (error, user) => {
//         if(error) return res.status(403);
//         req.user = user;
//         next();
//     });
// };

const verifyAccessToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return next(createError.Unauthorized());
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (error, payload) => {
        if(error) return next(createError.Unauthorized());
        req.payload = payload;
        next();
    });
};

module.exports = verifyAccessToken;