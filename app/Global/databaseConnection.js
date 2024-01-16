const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "trantuanthinh",
    database: "3t",
});

connection.connect((err) => {
    if (err) {
        console.log("Connection Database Failed: " + err.message);
    } else {
        console.log("Connected Database");
    }
})

module.exports = connection;