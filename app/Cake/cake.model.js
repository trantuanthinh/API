const database = require("../Global/databaseConnection");

var Cake = (cake) => {
    this.cake_id = cake.cake_id;
    this.cake_name = cake.cake_name;
    this.cake_size = cake.cake_size;
    this.cake_flavor = cake.cake_flavor;
    this.cake_price = cake.cake_price;
    this.cake_image = cake.cake_image;
};

Cake.getAll = (result) => {
    const sqlQuery = "SELECT * FROM CAKES";
    database.query(sqlQuery, (err, cakes) => {
        if (err) {
            result(err);
        } else {
            console.log("Get Successfully");
            result(cakes);
        }
    });
};

Cake.getByID = (id, result) => {
    const sqlQuery = "SELECT * FROM CAKES WHERE cake_id = " + id;
    database.query(sqlQuery, (err, cake) => {
        if (err) {
            result(err);
        } else {
            console.log("Get By ID Successfully");
            result(cake[0]);
        }
    });
};

Cake.create = (data, result) => {
    const values = {
        cake_id: data?.cake_id,
        cake_name: data?.cake_name || null,
        cake_size: data?.cake_size || null,
        cake_flavor: data?.cake_flavor || null,
        cake_price: data?.cake_price || null,
        cake_image: data?.cake_image || null,
    };
    const setClause = Object.entries(values)
        .map(([key, value]) => `${key} = ${value !== null ? `'${value}'` : 'NULL'}`)
        .join(', ');
    const sqlQuery = "INSERT INTO CAKES SET " + setClause;
    database.query(sqlQuery, (err) => {
        if (err) {
            result(err);
        } else {
            console.log("New Cake Added");
            result(data);
        }
    });
};

Cake.update = (data, result) => {
    const cake_id = data?.cake_id;
    const values = {
        cake_name: data?.cake_name || null,
        cake_size: data?.cake_size || null,
        cake_flavor: data?.cake_flavor || null,
        cake_price: data?.cake_price || null,
        cake_image: data?.cake_image || null,
    };
    const setClause = Object.entries(values)
        .filter(([key, value]) => value !== null)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(', ');

    const sqlQuery = "UPDATE CAKES SET " + setClause + " WHERE cake_id = " + cake_id;
    console.log(sqlQuery);
    database.query(sqlQuery, (err, cake) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Cake Updated");
            result(data);
        }
    });
};

Cake.deleteByID = (id, result) => {
    const sqlQuery = "Delete FROM CAKES WHERE cake_id = " + id;
    database.query(sqlQuery, (err) => {
        if (err) {
            result(err);
        } else {
            console.log("Cake Deleted");
            result("Cake Deleted");
        }
    });
};

module.exports = Cake;
