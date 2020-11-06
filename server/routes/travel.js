const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Travelhistory = require("../controllers/travel");
const auth = require("../middlewares/auth");

router
  .post("/:id/riderhistory", auth, Travelhistory.riderhistory)
  .post("/:id/driverhistory", Travelhistory.driverhistory);

module.exports = router;
