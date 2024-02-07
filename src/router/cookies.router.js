import express from "express";
import { createCookie, deleteCookie, getCookie, getCookies, updateCookie } from "./../controller/cookies.controller.js";

const cookiesRoutes = express.Router();

cookiesRoutes.route("/").get(getCookies).post(createCookie);

cookiesRoutes.route("/:id").get(getCookie).put(updateCookie).delete(deleteCookie);

export default cookiesRoutes;
