const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/login");

router.post("/", UsersController.login);

module.exports = router;
