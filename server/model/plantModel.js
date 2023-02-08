import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: false,
  },
  germinating_season: {
    type: String,
    required: false,
    unique: false,
  },
  harvest: {
    type: String,
    required: false,
    unique: false,
  },
  image: {
    type: String,
    required: true,
    unique: false,
  },
});
const plantModel = mongoose.model("plant", plantSchema);
export default plantModel;
