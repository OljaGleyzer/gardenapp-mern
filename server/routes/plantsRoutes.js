import express from "express";
import {
  getAllPlants,
  getPlantById,
  postPlant,
} from "../controller/plantController.js";
import jwt from "../middlewares/jwt.js";

const router = express.Router();
// GET
router.get("/all", getAllPlants);
router.get("/:_id", getPlantById);

// Post new plant to All collection
router.post("/all", postPlant);

export default router;
