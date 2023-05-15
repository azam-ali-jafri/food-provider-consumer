const Food = require("../model/food_model");
const axios = require("axios");

exports.createFood = async (req, res) => {
  const addressCoordinates = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${req.body.address}&key=${process.env.GEOCODER_API_KEY}`
  );

  if (addressCoordinates.data.results.length === 0)
    return res.status(500).json({
      message: "enter valid address",
    });
    
  const food = await Food.create(req.body);

  const long = addressCoordinates.data.results[0].geometry.lng;
  const lat = addressCoordinates.data.results[0].geometry.lat;
  const location = {
    type: "Point",
    coordinates: [long, lat],
  };

  food.location = location;
  food.user = req.user;
  await food.save();

  const foodList = await Food.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.json({
    foodList,
  });
};

exports.deleteFood = async (req, res) => {
  const { id } = req.params;

  const food = await Food.findById(id);

  if (req.user._id.toString() !== food.user.toString()) {
    return res.status(500).json({
      message: "you do not have permission to do this",
    });
  }

  await Food.findByIdAndDelete(id);

  const foodList = await Food.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.json({
    foodList,
  });
};
