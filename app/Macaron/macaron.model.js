const database = require("../Global/databaseConnection");

var Macaron = (macaron) => {
    this.macaron_id = macaron.macaron_id;
    this.macaron_name = macaron.macaron_name;
    this.macaron_size = macaron.macaron_size;
    this.macaron_flavor = macaron.macaron_flavor;
    this.macaron_price = macaron.macaron_price;
    this.macaron_image = macaron.macaron_image;
};

Macaron.getAll = (result) => {
    const sqlQuery = "SELECT * FROM MACARONS";
    database.query(sqlQuery, (err, macarons) => {
        if (err) {
            result(err);
        } else {
            console.log("Get Successfully");
            result(macarons);
        }
    });
};

Macaron.getByID = (id, result) => {
    const sqlQuery = "SELECT * FROM MACARONS WHERE macaron_id = " + id;
    database.query(sqlQuery, (err, macaron) => {
        if (err) {
            result(err);
        } else {
            console.log("Get By ID Successfully");
            result(macaron[0]);
        }
    });
};

Macaron.create = (data, result) => {
    const values = {
        macaron_id: data?.macaron_id,
        macaron_name: data?.macaron_name || null,
        macaron_size: data?.macaron_size || null,
        macaron_flavor: data?.macaron_flavor || null,
        macaron_price: data?.macaron_price || null,
        macaron_image: data?.macaron_image || null,
    };
    const setClause = Object.entries(values)
        .map(([key, value]) => `${key} = ${value !== null ? `'${value}'` : 'NULL'}`)
        .join(', ');
    const sqlQuery = "INSERT INTO MACARONS SET " + setClause;
    database.query(sqlQuery, (err) => {
        if (err) {
            result(err);
        } else {
            console.log("New Macaron Added");
            result(data);
        }
    });
};

Macaron.update = (data, result) => {
    const macaron_id = data?.macaron_id;
    const values = {
        macaron_name: data?.macaron_name || null,
        macaron_size: data?.macaron_size || null,
        macaron_flavor: data?.macaron_flavor || null,
        macaron_price: data?.macaron_price || null,
        macaron_image: data?.macaron_image || null,
    };
    const setClause = Object.entries(values)
        .filter(([key, value]) => value !== null)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(', ');

    const sqlQuery = "UPDATE MACARONS SET " + setClause + " WHERE macaron_id = " + macaron_id;
    console.log(sqlQuery);
    database.query(sqlQuery, (err, macaron) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Macaron Updated");
            result(data);
        }
    });
};

Macaron.deleteByID = (id, result) => {
    const sqlQuery = "Delete FROM MACARONS WHERE macaron_id = " + id;
    database.query(sqlQuery, (err) => {
        if (err) {
            result(err);
        } else {
            console.log("Macaron Deleted");
            result("Macaron Deleted");
        }
    });
};

module.exports = Macaron;
