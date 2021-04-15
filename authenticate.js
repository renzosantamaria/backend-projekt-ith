const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    if (req.body.username == 'grillkorv' && req.body.password == 'bananpaj') {
        console.log('banana');
        const payload = {
            username: req.body.username
        }
        token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30s'} ) 
        res.send({message: 'Access granted', token:token})
        
    }else{
        res.status(401).json({error: 'Invalid credentials'})
    }
}

module.exports = authenticate