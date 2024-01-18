const express = require("express");
const app = express();
const PORT = 8080;

//Config
var bodyParser = require("body-parser");
var authMiddleWare = require("./app/Global/MiddleWare")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routers
require("./app/Home/home.router")(app);
app.use(authMiddleWare.isAuth);
//Each routers below is checked by MiddleWare with authToken
require("./app/Cookie/cookie.router")(app);
require("./app/Cake/cake.router")(app);
require("./app/Macaron/macaron.router")(app);

app.listen(PORT, () => console.log(`Live on: http://localhost:${PORT}`));
