import express from "express";
import cors from "cors";
import router from "./routes/plants.js";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import plantsRoutes from "./routes/plantsRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

const mongoDBConnection = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connection to Mongo DB established on port" + port);
  } catch (error) {
    console.log("error conection to MONGODB", error);
  }
};

const loadRoutes = () => {
  app.use("/api", router);
  app.use("/api/plants", plantsRoutes);
};

const startServer = () => {
  app.listen(port, () => {
    console.log("Server is running on " + port + "port");
  });
};

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  const corsOptions = {
    origin: "http://localhost3000.com",
    credentials: true,
  };
  app.use(cors(corsOptions));
};

//IIFE
(async function controller() {
  await mongoDBConnection();
  loadRoutes();
  startServer();
  addMiddlewares();
})();
