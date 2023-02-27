import express from "express";
import {
  getAllPlants,
  getPlantById,
  postPlant,
  deletePlant,
} from "../controller/plantController.js";
import jwt from "../middlewares/jwt.js";

const router = express.Router();
// GET
router.get("/all", getAllPlants);
router.get("/:_id", getPlantById);

// Post new plant to All collection
router.post("/all", jwt, postPlant);

// Delete a Plant from All collection
router.delete("/all", deletePlant);

export default router;
