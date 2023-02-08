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
export { getAllPlants };
