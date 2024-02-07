import express from "express";
import { createMacaron, deleteMacaron, getMacaron, getMacarons, updateMacaron } from "./../controller/macarons.controller.js";

const macaronsRoutes = express.Router();

macaronsRoutes.route("/").get(getMacarons).post(createMacaron);

macaronsRoutes.route("/:id").get(getMacaron).put(updateMacaron).delete(deleteMacaron);

export default macaronsRoutes;
