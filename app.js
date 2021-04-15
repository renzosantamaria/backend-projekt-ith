const express = require('express')
const app = express()
const {authorize} = require('./token')
const {errorHandler} = require('./errors')
const authenticate = require('./authenticate')
require('dotenv').config()

app.use( express.json() )


app.post( '/auth', authenticate )

app.get ('/protected', authorize, (req, res) => {   
    console.log(req.user)
    res.send(`Welcome from GET Mr. ${req.user}`)
})

//-- update
app.patch( '/protected', authorize, (req, res) => {
    res.send(`Welcome from PATCH Mr. ${req.user}`)
}) 


app.use ( errorHandler )

app.listen( 5000, () => console.log('running on 5000'))