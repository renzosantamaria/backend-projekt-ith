const user_model = require('../models/user_model')
const faker = require("faker")
const {serverError, invalidQuery, tooManyRequestError, passwordTooShort} = require('../errors/errors.js')
const {encrypt, decrypt} = require('../utils/crypto.js')

const getAllUsers = async (req, res, next) => {
  try{
    const response = await user_model.getAllUsers()

    if(!response){ throw new serverError() }
    res.json(response)

  }catch(error){
    next(error)
    // res.json({"message": "Could not handle the request, please try again later"})
  }
  
}

const getThrottling = async (req, res, next) => {
  try{
    const response = await user_model.getThrottling()
    res.json(response)
  }catch(error){
    res.json({"message": "Could not handle the request, please try again later"})
    console.log(error)
  }
}
  
const changePassword = async (req, res, next) => {
  try{
    const newPassword = req.body.newPassword
    const email = req.user
    if (!newPassword || !email) { throw new invalidQuery('password, email') }
    if (newPassword.length < 4) {
      throw new passwordTooShort()
    }
    
    const response = await user_model.changePassword(email, newPassword)
    if (response) {
      res.json(response)
    }
      
  }catch(error){
    console.log(error.errorMessage)
    next(error)
  }
}

const profileGenerator = () => {
  const randomNumber = (arg1, arg2) => {
    let number = faker.datatype.number({ min: arg1, max: arg2 })
    number < 10 ? number = `0${number}` : ''
    return number
  }
  const newProfile = {
    name: faker.name.findName(),
    adress: faker.address.streetAddress(),
    profession: faker.name.jobTitle(),
    birthday: `${randomNumber(1,28)}/${randomNumber(1,12)}/${randomNumber(1920,2010)}`,
    hometown: faker.address.city(),
    personal_attribute: `I'm a ${faker.name.jobType()} that enjoys listening to ${faker.music.genre()} music`,
    picture: faker.image.avatar()
  }
  // Ett objekt (fake profile)
  // objektet ska stringify:as
  // den stringfy:ade objektet ska passas in i "encrypt" funcktionen
  // encrypt funktionen kommer att returnera ett objekt => {iv: "xxxx": content: "xxxx"}
  // det krypterade objektet ska stringify:as igen för att kunna passa in den i en ENDPOINT


  const shareableLink = encrypt(JSON.stringify(newProfile))
  let b64Encoded = Buffer.from(JSON.stringify(shareableLink)).toString('base64')


  newProfile.encoded = b64Encoded
  newProfile.link = `http://localhost:5000/user/${b64Encoded}`
  return newProfile
}

const generateProfile = async (req, res, next) => {

  try{
    const user_email = req.user
    if (!user_email) {
      throw new invalidQuery('email')
    }
    const {counter, user_id} = await user_model.reviewThrottlingCounter(user_email)

    if (counter >=10) { // SET BACK TO 10 AFTER TESTING THE APP
      throw new tooManyRequestError()
    }else{
      await user_model.increaseThrottlingCounter(user_id)
      const newProfile = profileGenerator()
      console.log(`${user_email} generated a fake user`)
      res.json({newProfile, message: `You have ${9-counter} requests left`}) // SET BACK TO 9 AFTER TESTING THE APP
    }
  }catch(error){
    console.log(`${req.user}, ${error.errorMessage}`)
    next(error)
  }

}

const decodeParams = (req, res) =>{
  try{
      let b64Encoded = req.params.base64data
      let b64Decoded = Buffer.from(b64Encoded, 'base64').toString()
      res.render('index', {profile: JSON.parse(decrypt(JSON.parse(b64Decoded)))}, function(err, html) {
          if(err){
              
              console.log(err.message)
          }
          res.send(html);
      });
  }catch(error){
      console.log('Invalid params');
      throw new invalidQuery('Correct params')

  }


}

module.exports = {
    getAllUsers,
    getThrottling,
    changePassword,
    generateProfile,
    decodeParams
}