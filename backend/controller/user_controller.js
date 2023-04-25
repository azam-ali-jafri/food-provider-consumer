const bcrypt = require("bcrypt");
const User = require("../model/user_model");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const Food = require("../model/food_model");
const QueryFilter = require("../utils/queryFilter");

exports.createUser = async (req, res) => {
  var { name, email } = req.body;

  var user = await User.findOne({ email: email });

  if (!user) user = await User.create({ name, email });

  const token = jwt.sign(user._id.toJSON(), process.env.JWT_SECRET);

  res.cookie("token", token).json({
    user,
  });
};

exports.logoutUser = (req, res) => {
  req.user = null;
  res.clearCookie("token").json({
    success: true,
  });
};

exports.getProviderList = async (req, res) => {
  const user = req.user;

  const list = await Food.find({ user: user._id }).sort({ createdAt: -1 });

  res.json({
    list,
  });
};

exports.getNearFoodProvider = async (req, res) => {
  try {
    const { range, address, foodName } = req.query;
    const { coordinates } = req.body;
    const miles = range && range * 0.621371;
    const rangeOptions =
      range && coordinates
        ? {
            location: {
              $geoWithin: {
                $centerSphere: [
                  [coordinates[0], coordinates[1]],
                  miles / 3963.2,
                ],
              },
            },
          }
        : {};

    const addressOptions = address
      ? {
          address: { $regex: address, $options: "i" },
        }
      : {};

    const foodList = await Food.find().find(rangeOptions).find(addressOptions);

    res.json({
      foodList,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.loadUser = async (req, res) => {
  res.json({
    user: req.user,
  });
};
