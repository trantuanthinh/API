const mysql = require("mysql2");

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "trantuanthinh",
    DB: "3t",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};

pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    port: 3306,
    user: "root",
    password: "trantuanthinh",
    database: "3t",
    // Enables query format like this:
    // `connection.query("UPDATE x SET col=:v1" , { v1: 999 }, ...`
    //
    // NOTE: How to insert binary data:
    // ```
    // // Read BLOB:
    // pool.query(`SELECT * FROM example`, function(err, res) {
    //   const buf = new Buffer(res[0].data); // `data` column type is BLOB!
    //   // Write BLOB:
    //   pool.query("INSERT INTO example(data) VALUES(BINARY(:buf))", { buf }, ...);
    // }
    // ```
    queryFormat: function (query, values) {
        if (!values) return query;
        return query.replace(
            /\:(\w+)/g,
            function (txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this)
        );
    },
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log("Error connecting to the database: " + err.message);
    } else {
        console.log("Connected to the database using Pool");
        // connection.release();
    }
});

module.exports = pool;
