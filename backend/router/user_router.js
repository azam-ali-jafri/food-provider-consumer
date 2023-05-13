const {
  createUser,
  getProviderList,
  getNearFoodProvider,
  loadUser,
  logoutUser,
} = require("../controller/user_controller");
const { isAuthenticated } = require("../utils/auth_check");

const router = require("express").Router();

router.route("/create").post(createUser);
router.route("/logout").get(logoutUser);
router.route("/provider/list").get(isAuthenticated, getProviderList);
router.route("/consumer/list").post(getNearFoodProvider);
router.route("/load").get(isAuthenticated, loadUser);

module.exports = router;
