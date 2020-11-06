const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/register");
const auth = require("../middlewares/auth");

router
  .post("/register", UsersController.register)
  .get("/allusers", UsersController.allusers)
  .get("/:id", UsersController.oneuser)
  .put("/:id/update", auth, UsersController.update)
  .put("/:id/updateloc", auth, UsersController.updateloc)
  .delete("/:id/delete", auth, UsersController.delete);

module.exports = router;
