const jwt = require('jsonwebtoken')

const {accessDenied} = require('./errors')

const authorize = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]
        let decrypted = jwt.verify( token, process.env.JWT_SECRET )
        req.user = decrypted.username
        next()
    }
    catch(Error){
        next(new accessDenied())
    }
}

module.exports = {
    authorize
}