const express = require('express')
const app = express()
require('dotenv').config()

const JsonErrorHandler = require('./errors/requireJson')
const {errorHandler} = require('./middlewares/errorHandler')
const CORS = require('./middlewares/CORS')
const Logger = require('./middlewares/Logger')
const user_routes = require('./routes/users')
const {resetThrottlingCounter} = require('./models/user_model')



resetThrottlingCounter() //Restarts the counter of the Throttle table. Runs everyday at midnight

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'))

app.use( Logger )

app.use( CORS )

app.use( express.json() )

app.use( JsonErrorHandler )

app.use( user_routes )

app.use ( errorHandler )



app.listen( process.env.PORT || 8080, () => console.log('running on 5000'))










// ------------------------------SEQUELIZE-----------------------------
/*
const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database/mydb.sqlite'
})

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull:false
    }
})

sequelize.sync()
*/
