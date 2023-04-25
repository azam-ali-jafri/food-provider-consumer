const User = require("../model/user_model");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(500).json({
      message: "login to access that feature",
    });

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedToken);
  req.user = user;
  next();
};
