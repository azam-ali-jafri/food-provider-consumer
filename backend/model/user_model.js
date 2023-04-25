const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");
const axios = require("axios");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
