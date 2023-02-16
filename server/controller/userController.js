import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import { passwordEncryption, verifyPassword } from "../utils/bcrypt.js";
import generateToken from "../utils/jwt.js";

const uploadUserPicture = async (req, res) => {
  console.log("req", req.file);
  try {
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "Plants",
    });

    console.log("upload", upload);
    res.status(200).json({
      msg: "Image upload ok",
      imageUrl: upload.url,
    });
  } catch (error) {
    res.status(500).json({ msg: "couldnt upload image", error: error });
  }
};

const signup = async (req, res) => {
  console.log("req.body :>> ", req.body);

  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    console.log("existingUser :>> ", existingUser);

    if (existingUser) {
      res.status(409).json({
        msg: "ups, email already in use....you might have an account and forgot",
      });
    } else {
      const hashedPassword = await passwordEncryption(req.body.password);
      console.log("hashedPassword", hashedPassword);
      const newUser = new userModel({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        userPicture: req.body.userPicture,
      });

      try {
        const savedUser = await newUser.save();
        console.log("savedUser", savedUser);
        res.status(201).json({
          msg: "user registered",
          user: {
            userName: savedUser.userName,
            email: savedUser.email,
            userPicture: savedUser.userPicture,
          },
        });
      } catch (error) {
        res
          .status(400)
          .json({ msg: "error during user registration", error: error });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: "error in general", error: error });
  }
};

const login = async (req, res) => {
  console.log("req", req.body);
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    console.log("existingUser", existingUser);
    if (!existingUser) {
      res.status(401).json({ msg: "wrong email" });
    } else {
      const isPasswordMatch = await verifyPassword(
        req.body.password,
        existingUser.password
      );
      console.log("isPasswordMatch", isPasswordMatch);
    }

    if (!isPasswordMatch) {
      res.status(401).json({ msg: "Wrong Password!" });
    } else {
      const token = generateToken(existingUser._id);
      console.log("token", token);
      res.status(200).json({
        msg: "you are logged in!!!",
        token,
        user: {
          id: existingUser._id,
          userName: existingUser.userName,
          email: existingUser.email,
          userPicture: existingUser.userPicture,
        },
      });
    }
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
};

export { uploadUserPicture, signup, login };
