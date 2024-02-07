const jwt = require("jsonwebtoken");
const authToken = require("./AuthToken");

let make = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { data: user },
            authToken.ACCESS_TOKEN,
            {
                algorithm: "HS256", // Protocol to Encrypt Data
                expiresIn: authToken.TOKEN_TIME_LIFE,
            },
            (err, __token) => {
                if (err) {
                    return reject(err);
                }
                return resolve(__token);
            }
        );
    });
};

let check = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, authToken.ACCESS_TOKEN, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
};

module.exports = {
    make: make,
    check: check,
};
