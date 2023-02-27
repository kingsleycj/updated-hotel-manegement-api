const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const constants = require("./constants/constants");
const controller = require("./controller/controller");
const {authUser} = require("./middlewares/authorization"); // simple middleware authorization
const verifyJWT = require("./middlewares/authentication"); // JWT authentication
const connectToMongoDB = require("./database/database")
const joi = require("joi");
const { validateSchema } = require('./middlewares/validator');
const app = express();
const { MESSAGES } = constants;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_ATLAS_DB, {
    // useMongoClient: true,
    // useNewUrlParser: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes that should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
