import express from "express";
import {
  signup,
  login,
  uploadUserPicture,
} from "../controller/userController.js";
import { multerUpload } from "../middlewares/multer.js";

const router = express.Router();
router.post("/imageupload", multerUpload.single("image"), uploadUserPicture);

router.post("/signup", signup);
router.post("/login", login);

export default router;
