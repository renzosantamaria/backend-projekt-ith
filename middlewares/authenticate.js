const bcrypt = require("bcryptjs")
const db = require("../database/connection.js");
const jwt = require('jsonwebtoken')
const {accessDenied, invalidQuery} = require('../errors/errors')

function evaluateCredentials(email, password, next){
    
    return new Promise((resolve, reject) => {
        db.all("SELECT password FROM user_list where email = ?",[email], function (err, rows) {
            err && res.json({message: 'wrong credentials'})
            try{
                if (rows.length > 0) {
                    resolve(bcrypt.compareSync(password, rows[0].password))
                }else{
                    throw new Error("no user found")
                }

            }catch(err){
                console.log(err)
                reject({message: err, data:"no user found!"})
            }

        });
    })
}

const authenticate = async (req, res, next) => {
    try{
        const email = req.body.email
        const password = req.body.password
        if (!email || !password) {
            throw new invalidQuery('email, password')
        }

        const isCorrectCredentials = await evaluateCredentials(email, password)

        if (isCorrectCredentials) {
            const payload = { username: req.body.email }
            token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'} ) 
            console.log(`${email} logged in succesfully`)
            res.send({message: 'Access granted', token:token, username:req.body.email})
            next()
            
        }else{
            throw new accessDenied()
        }
    }catch(error){
        console.log(error.errorMessage)
        next(error)
    }    
}

module.exports = authenticate
