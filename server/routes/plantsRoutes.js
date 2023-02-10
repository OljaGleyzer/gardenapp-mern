import express from "express";
import { getAllPlants, getPlantById } from "../controller/plantController.js";

const router = express.Router();

router.get("/all", getAllPlants);
router.get("/:_id", getPlantById);

export default router;
