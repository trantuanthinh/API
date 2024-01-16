module.exports = (router) => {
    const JWT = require("../Global/JWT");

    router.get("/token", async (req, res) => {
        var user = {
            name: "Admin",
            email: "admin@gmai.com"
        }
        const __token = await JWT.make(user);
        res.send({ token: __token })
    })
}