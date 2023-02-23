import express from "express";
import {
  signup,
  login,
  uploadUserPicture,
  getProfile,
} from "../controller/userController.js";
import jwt from "../middlewares/jwt.js";
import { multerUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/imageupload", multerUpload.single("image"), uploadUserPicture);
// router.put("/update", multer, updateUser)
router.post("/signup", signup);
router.post("/login", login);
router.get("/myprofile", jwt, getProfile);
export default router;
