const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Rider = require("../models/rider.model");
const Driver = require("../models/driver.model");
const drivinghistory = require("../models/drivinghistory");
const ridinghistory = require("../models/ridinghistory");

require("dotenv").config();

exports.riderhistory = async (req, res) => {
  const user = await Rider.findOne({ _id: req.params.id });
  if (!user) return res.status(400).json({ message: "User does not exit" });
  let Obj = JSON.parse(JSON.stringify(req.body));
  const rider = new ridinghistory(Obj);
  user.ridinghistory.push(rider);
  user.save();
  res.send(user);
};
exports.driverhistory = async (req, res) => {
  const user = await Driver.findOne({ _id: req.params.id });
  if (!user) return res.status(400).json({ message: "User does not exit" });
  let Obj = JSON.parse(JSON.stringify(req.body));
  const driver = new drivinghistory(Obj);
  user.drivinghistory.push(driver);
  user.save();
  res.send(user);
};
