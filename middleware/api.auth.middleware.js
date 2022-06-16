const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
require('dotenv').config();
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;

const auth = async (req, res, next) => {
    if(req.header('Authorization') == undefined) 
    {
        return  res.status(403).send('Token empty?????');
    }
    const token = req.header('Authorization').replace('Bearer','')
    const data = jwt.verify(token, chuoi_ky_tu_bi_mat)
    console.log(data);
    try {
        const user = await User.findOne({_id: data.id,'tokens.token':token})
        if (!user){
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({error:'Not authorization to access this resource'})
    }
}
module.exports = auth;

// const JWT = require('jsonwebtoken');
// module.exports = {
//     authentication: (req, res, next) => {
//         const authorization = req.headers.authorization;
 
//         const tokens = authorization.split('Bearer ');
//         const token = tokens[1];
//         if (!token) {
//             return res.json({success: false, msg: 'Token required'})
//         }
//         let data;
//         try {
//             data = JWT.verify(token, 'mySecret');
//         } catch (error) {
//             return res.json({success: false, msg: 'authentication failed'})
//         }
//         req.user = data.user;
//         return next();
//     },
 
//     verifyToken: (req, res, next) => {
//         const authorization = req.headers.authorization;
//         const tokens = authorization.split('Bearer ');
//         const token = tokens[1];
//         if (!token)
//             return res
//                 .status(403)
//                 .send({auth: false, message: 'No token provided.'});
//         try {
//             JWT.verify(token, 'mySecret', function (err, decoded) {
//               if (err) return res.status(500).send({auth: false, message: err});
//               req.user = decoded.user;
//               next();
//             });
//         } catch (error) {
//             return res.json({success: false, msg: 'authentication failed'});
//         }
//     }
// }

