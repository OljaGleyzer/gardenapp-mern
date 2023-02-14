import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

const signup = async (req, res) => {
  console.log("req.body :>> ", req.body);

  try {
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      res
        .status(409)
        .json({ msg: "user already exist ...email already in use..." });
    } else {
      //REVIEW[epic=demo, seq=23] 23. good place to use express validator middleware, to validate email/password/any other fields. (or any other form of validation/check)

      //REVIEW[epic=demo, seq=19] 19. use encryptPassword function to hash password coming from the request.
      const hashedPassword = await encryptPassword(req.body.password);

      //REVIEW[epic=demo, seq=20] 20. create new user Object with the encrypted password and the uploaded picture
      const newUser = new userModel({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        userPicture: req.body.userPicture,
        //REVIEW[epic=demo, seq=22] 22. IF we include user Roles, we would have to include it in our newUser object (and Model)
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
          .status(500)
          .json({ msg: "error during user registration", error: error });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: "error in general", error: error });
  }
};

//REVIEW[epic=demo, seq=17] 17. Start implementing password encription: Install bcrypt
//REVIEW[epic=demo, seq=18] 18. Import bcrypt and create function to hash password and implement bcrypt technique

const encryptPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("error hashing password", error);
  }
};

export { signup };
