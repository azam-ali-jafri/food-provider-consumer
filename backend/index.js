const bodyParser = require("body-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config({ path: "./.env" });
const userRouter = require("./router/user_router");
const foodRouter = require("./router/food_route");
const cors = require("cors");

const connectToDB = () => {
  mongoose.connect("mongodb://localhost:27017/Project").then(() => {
    console.log("database connected");
  });
};

connectToDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/food", foodRouter);

app.listen(process.env.PORT, () => {
  console.log("app listening on port 4000");
});
