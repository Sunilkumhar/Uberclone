const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ridinghistorySchema = new Schema(
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
    price: {
      type: Number,
      required: [true, "Price required"],
      trim: true,
    },
    customer_name: {
      type: String,
      required: [true, "Name required"],
      trim: true,
      minlength: 3,
    },
    date: {
      type: Date,
      // required: [true, "riding date required"],
      default: Date.now,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ridinghistory = mongoose.model("ridinghistory", ridinghistorySchema);

module.exports = ridinghistory;
