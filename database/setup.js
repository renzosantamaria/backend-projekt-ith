const db = require('./connection.js')

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS user_list")
    db.run("DROP TABLE IF EXISTS throttling")
    db.run(
        `CREATE TABLE "user_list"
        ("user_id" INTEGER,
        "email"	TEXT NOT NULL UNIQUE,
        "password"	TEXT NOT NULL,
        PRIMARY KEY("user_id" AUTOINCREMENT ));`
        )
        db.run(`CREATE TABLE "throttling"
        (
        "id" INTEGER NOT NULL,
        "user_id"	INTEGER,
        "counter"   INTEGER NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("user_id")
        REFERENCES "user_list"("user_id"));`)

        // Enable SQL error on foreign keyconstraints
        db.get("PRAGMA foreign_keys = ON")
})