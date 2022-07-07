const jwt = require('jsonwebtoken')

async function authentic(req,res,next){

if (req.method === 'OPTIONS') {
    return next()
}

if (!req.header('Authorization')) {
    return res
         .status(401)
         .json({ message: 'invalid token'})
}

const token = req.header('Authorization')
let decoded = null;

try {
    console.log(token);
    decoded = jwt.verify(token,'keyyyyyyyyyyyyyy')
} catch (e) {
    return res
         .status(401)
         .json({ message: 'invalid token 1'})
}

req.userId = decoded.sub
next()
}

module.exports = authentic;