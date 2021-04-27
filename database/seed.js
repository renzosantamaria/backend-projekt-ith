const bcrypt = require("bcryptjs")
const db = require('./connection.js')

let insert_user_list = `INSERT INTO user_list (email, password)
                        VALUES ('stabbing.steve@fuskeluring.hack', ?),
                        ('murdering.mike@fuskeluring.hack', ?),
                        ('crimes.johnsson@fuskeluring.hack', ?)`

let throttling = `INSERT INTO throttling (user_id, counter)
                    VALUES (1, 0),
                    (2, 0),
                    (3, 0)`

const digest1 = bcrypt.hashSync("grillkorv123", 10)
const digest2 = bcrypt.hashSync("bananpaj1337", 10)
const digest3 = bcrypt.hashSync("sötsursås42", 10)


db.run(insert_user_list, [digest1, digest2, digest3],
  function (error) {
      error && console.log('error from seed1' + error)
  })


db.run(throttling,
  function (error) {
      console.log('error from seed2' + error);
  })