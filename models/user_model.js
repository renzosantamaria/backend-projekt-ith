const db = require("../database/connection.js");
const errors = require('../middlewares/errorHandler.js')
const bcrypt = require("bcryptjs")
const schedule = require('node-schedule')
const {dataBaseError} = require('../errors/errors.js')


//Restarts the counter of the Throttle table. Runs everyday at midnight
const resetThrottlingCounter = () => {schedule.scheduleJob(' 00 00 * * *', () => {

  db.run("UPDATE throttling SET counter = 0", function (err, rows) {
    err && console.log(err)
    console.log('throttling counter has been cleared')
  })

})} 

function getAllUsers() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM user_list", function (err, rows) {
        err && reject(err)
        if(rows == undefined){
          reject( new errors.noResult())
        }
        resolve(rows);
      });
    });
  }

function getThrottling() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM throttling", function (err, rows) {
        err && reject(err)
        if(rows == undefined){
          reject( new errors.noResult())
        }
        resolve(rows);
      });
    });
}

function changePassword(email, newPassword) {
  const digest = bcrypt.hashSync(newPassword, 10)

  return new Promise((resolve, reject) => {
    db.run("UPDATE user_list SET password = ? WHERE email = ?", [digest, email], function (err) {
      if (this.changes < 1) {
        throw new dataBaseError()
      }
      err && reject(err)
      console.log(`${email}'s password has been updated`);
      resolve({message: "password updated!"})
    })
  })
}

function reviewThrottlingCounter(user_email) {
  return new Promise( (resolve, reject) => {
    db.get("SELECT user_id FROM user_list WHERE email = ?",[user_email], function (err, rows) {
      err && reject(err)
      let user_id = rows.user_id

      db.get("SELECT counter FROM throttling WHERE user_id = ?",[user_id], function (err, rows) {
        err && reject(err)
        resolve({user_id: user_id, counter: rows.counter})
      })
    })
  })
}

function increaseThrottlingCounter(user_id) {
  return new Promise( (resolve,reject) => {
    db.run("UPDATE throttling SET counter = counter + 1 WHERE user_id = ?",[user_id], function (err, rows) {
      err && reject(err)
      resolve(rows)
    })
  })
}

module.exports = {
    getAllUsers,
    getThrottling,
    changePassword,
    reviewThrottlingCounter,
    increaseThrottlingCounter,
    resetThrottlingCounter
};