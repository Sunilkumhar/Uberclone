const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelhistorySchema = new Schema(
  {
    start: {
      type: String,
      required: [true, "Start required"],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, "Destination required"],
      trim: true,
    },
    carnumber: {
      type: String,
      required: [true, "Car number required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price required"],
      trim: true,
    },
    driver_name: {
      type: String,
      required: [true, "Name required"],
      trim: true,
      minlength: 3,
    },
    date: {
      type: Date,
      // required: [true, "Travel date required"],
      default: Date.now,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const travelhistory = mongoose.model("travelhistory", travelhistorySchema);

module.exports = travelhistory;
