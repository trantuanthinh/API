const PORT_Server = 8080;
const PORT_Client = 3000;
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: [`https://localhost:${PORT_Client}`]
    }
});

// Config
var bodyParser = require("body-parser");
var authMiddleWare = require("./app/Global/MiddleWare");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routers
require("./app/Home/home.router")(app);
// app.use(authMiddleWare.isAuth);
// Each router below is checked by Middleware with authToken
require("./app/Cookie/cookie.router")(app);
require("./app/Cake/cake.router")(app);
require("./app/Macaron/macaron.router")(app);

server.listen(PORT_Server
    , () => console.log(`Server is on: http://localhost:${PORT_Server}`));

io.on('connection', (socket) => {
    console.log("Socket.io is on: " + socket.id);
});
