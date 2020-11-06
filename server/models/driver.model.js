const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const drivinghistory = require("./drivinghistory");
require("dotenv").config();

const Schema = mongoose.Schema;

const driverSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
      trim: true,
      minlenght: 3,
    },
    email: {
      type: String,
      required: [true, "Email required"],
      trim: true,
    },
    phone: {
      type: Number,
      required: [true, "Phone required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City required"],
      trim: true,
    },
    carsize: {
      type: Number,
      trim: true,
    },
    carname: {
      type: String,
      trim: true,
    },
    carnumber: {
      type: String,
      trim: true,
    },
    currlocation: {
      type: String,
      required: [true, "currentloc required required"],
      trim: true,
    },
    drivinghistory: ["drivinghistory"],
  },
  {
    timestamps: true,
  }
);
driverSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    process.env.uber_jwtprivate,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
