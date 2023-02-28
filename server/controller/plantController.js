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

const postPlant = async (req, res) => {
  console.log("req.user", req.user);
  console.log("create plant", req.body);
  console.log("req.body", req.body.name);

  try {
    const { name, description, germinating_season, harvest, image } = req.body;
    console.log("req.body", req.body);

    const existingPlant = await plantModel.findOne({ name: req.body.name });
    console.log("existingPlant :>> ", existingPlant);
    console.log("req.user", req.user);

    if (existingPlant) {
      res.status(409).json({
        msg: "ups, this plant already exists",
      });
    } else {
      const newPlant = new plantModel({
        userName: req.user.userName, // req.body or req.user?
        name: req.body.name,
        description: req.body.description,
        germinating_season: req.body.germinating_season,
        harvest: req.body.harvest,
        image: req.body.image,
        userEmail: req.user.email,
      });
      console.log("newPlant", newPlant);
      try {
        const savedPlant = await newPlant.save();
        res.status(201).json({
          msg: "yay, you uploaded a plant",
          plant: {
            userName: savedPlant.userName,
            name: savedPlant.name,
            description: savedPlant.description,
            germinating_season: savedPlant.germinating_season,
            harvest: savedPlant.harvest,
            image: savedPlant.image,
          },
        });
      } catch (error) {
        console.log("error during posting");
        res.status(500).json({
          msg: "error during posting",
          error: error,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: "error in general", error: error });
  }
};

const deletePlant = async (req, res) => {
  console.log("req.user", req.user);
  //check here that req.user.email === selectedPlant.userEmail
  const { _id } = req.body;

  try {
    const selectedPlant = await plantModel.findOne({ _id: _id });

    if (!selectedPlant) {
      return res.status(404).json({ msg: "Plant not found" });
    }

    // if (selectedPlant.userEmail !== req.user.email) {
    //   return res.status(401).json({ msg: "Unauthorized" });
    // }

    await plantModel.findOneAndDelete({ _id: _id });

    res.status(200).json({ msg: "Plant deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error during delete", error });
  }
};

//   try {
//     const existingPlant = await plantModel.findOne({
//       _id: _id,
//     });

//     if (existingPlant) {
//       await plantModel.findOneAndDelete({
//         _id: _id,
//       });

//       res.status(200).json({
//         msg: "Plant deleted successfully",
//       });
//     } else {
//       res.status(404).json({
//         msg: "Plant not found",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       msg: "Error during delete",
//       error: error,
//     });
//   }
// };

export { getAllPlants, getPlantById, postPlant, deletePlant };
