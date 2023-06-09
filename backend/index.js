const bodyParser = require("body-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./router/user_router");
const foodRouter = require("./router/food_route");
const cors = require("cors");
const path = require("path");

const app = express();

require("dotenv").config({ path: "./backend/.env" });

const connectToDB = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

connectToDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/food", foodRouter);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("app listening");
});
