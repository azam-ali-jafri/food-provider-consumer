const { createFood, deleteFood } = require("../controller/food_controller");
const { isAuthenticated } = require("../utils/auth_check");

const router = require("express").Router();

router.route("/create").post(isAuthenticated, createFood);

router.route("/delete/:id").delete(isAuthenticated, deleteFood);

module.exports = router;
