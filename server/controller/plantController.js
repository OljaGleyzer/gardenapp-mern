import plantModel from "../model/plantModel.js";

const getAllPlants = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const allPlants = await plantModel.find({});
    console.log("allPlants :>> ", allPlants);
    res.status(200).json({
      number: allPlants.length,
      allPlants,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "something went wrong",
    });
  }
};

const getPlantById = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { id } = req.params;
    const plantById = await plantModel.find({ _id: req.params._id });
    console.log("plantById :>> ", plantById);
    if (!plantById) {
      res.status(404).json({
        msg: "Plant not found",
      });
    }
    res.status(200).json({
      number: plantById.length,
      plantById,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "something went wrong",
    });
  }
};
export { getAllPlants, getPlantById };
