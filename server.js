// PORT_Server = 3000;
// PORT_Client = 8080;
const PORT_Server = 3000;
const PORT_Client = 8080;
// const express = require("express");
// const http = require("http");
// const socketIO = require("socket.io");
// const axios = require('axios');
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import ip from "ip";
import HttpStatus from "./src/controller/cakes.controller.js";
import Response from "./src/domain/response.js";
import cakesRoutes from "./src/router/cakes.router.js";
import cookiesRoutes from "./src/router/cookies.router.js";
import macaronsRoutes from "./src/router/macarons.router.js";
import logger from "./src/util/logger.js";

dotenv.config();
const PORT = process.env.SERVER_PORT || PORT_Server;
const app = express();

app.use(
    cors({
        origin: "*",
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
cakesRoutes.use(express.json());
cookiesRoutes.use(express.json());
macaronsRoutes.use(express.json());
app.use("/cakes", cakesRoutes);
app.use("/cookies", cookiesRoutes);
app.use("/macarons", macaronsRoutes);

app.get("/", (req, res) => res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, "Cake API")));

app.all("*", (req, res) =>
    res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, "Page Not Found"))
);

app.listen(PORT, () => {
    logger.info(`Server is running on: ${ip.address()}:${PORT}`);
});

// const server = http.createServer(app);
// const io = socketIO(server, {
//     cors: {
//         origin: [`https://localhost:${PORT_Client}`],
//     },
// });

// Config
// var bodyParser = require("body-parser");
// var authMiddleWare = require("./app/Global/MiddleWare");
// app.use(bodyParser.urlencoded({ extended: false }));

// // Routers
// require("./app/Home/home.router")(app);
// // app.use(authMiddleWare.isAuth);
// // Each router below is checked by Middleware with authToken
// require("./app/Cookie/cookie.router")(app);
// require("./app/Cake/cake.router")(app);
// require("./app/Macaron/macaron.router")(app);

// server.listen(PORT_Server, () =>
//     console.log(`Server is on: http://localhost:${PORT_Server}`)
// );

// io.on("connect", (socket) => {
//     console.log("Client connected. Socket.io is on: " + socket.id);
// });
