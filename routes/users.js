const express = require ('express')
const router = express.Router()



const users_controller = require('../controllers/user')
const authenticate = require("../middlewares/authenticate")
const authorize = require("../middlewares/token")

router.get( '/getusers', users_controller.getAllUsers )
router.get( '/getThrottling', users_controller.getThrottling )

router.post( '/login', authenticate)

router.get( '/me', authorize, (req, res) => { res.send({message: `Welcome ${req.user}`}) })

router.patch( '/me', authorize, users_controller.changePassword) 

router.get('/generate', authorize, users_controller.generateProfile)

router.get('/user/:base64data', authorize, users_controller.decodeParams)



module.exports = router