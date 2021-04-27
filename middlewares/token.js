const jwt = require('jsonwebtoken')


const authorize = (req, res, next) => {
    try{
        const token = req.headers.authorization.replace("Bearer ","")
        let decrypted = jwt.verify( token, process.env.JWT_SECRET )
        req.user = decrypted.username
        next()
    }
    catch(Error){
        res.render('404', function(err, html) {
            err && console.log(err);
            res.send(html);
        })
    }
}

module.exports = authorize