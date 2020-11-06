const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const ridinghistory = require("./ridinghistory");
require("dotenv").config();

const Schema = mongoose.Schema;

const riderSchema = new Schema(
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
    ridinghistory: ["ridinghistory"],
  },
  {
    timestamps: true,
  }
);
riderSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    process.env.uber_jwtprivate
  );
  return token;
};

const Rider = mongoose.model("Rider", riderSchema);

module.exports = Rider;
