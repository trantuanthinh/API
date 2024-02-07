import express from "express";
import { createCake, deleteCake, getCake, getCakes, updateCake } from "./../controller/cakes.controller.js";

const cakesRoutes = express.Router();

cakesRoutes.route("/").get(getCakes).post(createCake);

cakesRoutes.route("/:id").get(getCake).put(updateCake).delete(deleteCake);

export default cakesRoutes;
