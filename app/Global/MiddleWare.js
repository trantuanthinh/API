let isAuth = async (req, res, next) => {
    var _JWT = require("../Global/JWT")
    console.log(req);
    var _token = req.headers.authorization;
    if (_token) {
        try {
            var authData = await _JWT.check(_token);
            req.auth = authData;
            next();
        } catch {
            return res.send({ data: "Invalid Token" })
        }
    } else {
        return res.send({ data: "Not Find Token" })
    }
}

module.exports = {
    isAuth: isAuth,
}