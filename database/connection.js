const sqlite = require('sqlite3')
const db = new sqlite.Database("database/fuskeluring.db")
module.exports = db