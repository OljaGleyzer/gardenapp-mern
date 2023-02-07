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
  harvest_season: {
    type: String,
    required: false,
    unique: false,
  },
});
const plantModal = mongoose.model("plant", plantSchema);
export default plantModal;
