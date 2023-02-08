import express from "express";
import { getAllPlants } from "../controller/plantController.js";

const router = express.Router();

router.get("/all", getAllPlants);

export default router;
