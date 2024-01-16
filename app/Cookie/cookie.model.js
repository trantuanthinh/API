const database = require("../Global/databaseConnection");

var Cookie = function (cookie) {
    this.cookie_id = cookie.cookie_id;
    this.cookie_name = cookie.cookie_name;
    this.cookie_size = cookie.cookie_size;
    this.cookie_flavor = cookie.cookie_flavor;
    this.cookie_price = cookie.cookie_price;
    this.cookie_image = cookie.cookie_image;
};

Cookie.getAll = (result) => {
    const sqlQuery = "SELECT * FROM COOKIES";
    database.query(sqlQuery, (err, cookies) => {
        if (err) {
            result(err);
        } else {
            console.log("Get Successfully");
            result(cookies);
        }
    });
};

Cookie.getByID = (id, result) => {
    const sqlQuery = "SELECT * FROM COOKIES WHERE cookie_id = " + id;
    database.query(sqlQuery, (err, cookie) => {
        if (err) {
            result(err);
        } else {
            console.log("Get By ID Successfully");
            result(cookie[0]);
        }
    });
};

Cookie.create = (data, result) => {
    const values = {
        cookie_id: data?.cookie_id,
        cookie_name: data?.cookie_name || null,
        cookie_size: data?.cookie_size || null,
        cookie_flavor: data?.cookie_flavor || null,
        cookie_price: data?.cookie_price || null,
        cookie_image: data?.cookie_image || null,
    };
    const setClause = Object.entries(values)
        .map(([key, value]) => `${key} = ${value !== null ? `'${value}'` : 'NULL'}`)
        .join(', ');
    const sqlQuery = "INSERT INTO COOKIES SET " + setClause;
    database.query(sqlQuery, (err) => {
        if (err) {
            result(err);
        } else {
            console.log("New Cookie Added");
            result(data);
        }
    });
};

Cookie.update = (data, result) => {
    const cookie_id = data?.cookie_id;
    const values = {
        cookie_name: data?.cookie_name || null,
        cookie_size: data?.cookie_size || null,
        cookie_flavor: data?.cookie_flavor || null,
        cookie_price: data?.cookie_price || null,
        cookie_image: data?.cookie_image || null,
    };
    const setClause = Object.entries(values)
        .filter(([key, value]) => value !== null)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(', ');

    const sqlQuery = "UPDATE COOKIES SET " + setClause + " WHERE cookie_id = " + cookie_id;
    console.log(sqlQuery);
    database.query(sqlQuery, (err, cookie) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Cookie Updated");
            result(data);
        }
    });
};

Cookie.deleteByID = (id, result) => {
    const sqlQuery = "DELETE FROM COOKIES WHERE cookie_id = " + id;
    database.query(sqlQuery, (err) => {
        if (err) {
            result(err);
        } else {
            console.log("Cookie Deleted");
            result("Cookie Deleted");
        }
    });
};

module.exports = Cookie;
