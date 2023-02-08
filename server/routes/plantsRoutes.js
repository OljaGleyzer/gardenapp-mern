import express from "express";
import { getAllPlants } from "../controller/plantController.js";
import plantModel from "../model/plantModel.js";

const router = express.Router();

router.get("/all", getAllPlants);

export default router;
