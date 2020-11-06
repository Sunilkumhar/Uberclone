const bcrypt = require("bcrypt");
const Rider = require("../models/rider.model");
const Driver = require("../models/driver.model");

exports.login = async (req, res) => {
  const type = req.header("type");
  let rolltype;
  if (type === "driver") rolltype = Driver;
  else rolltype = Rider;

  let user;
  if (req.body.email) {
    user = await rolltype.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
  } else if (req.body.phone) {
    user = await rolltype.findOne({ phone: req.body.phone });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
  } else {
    return res.status(400).json({ message: "Provide all Required fields" });
  }

  const validpass = await bcrypt.compare(req.body.password, user.password);
  if (!validpass)
    return res.status(400).json({ message: "Invalid Credentials" });

  const token = user.generateAuthToken();
  res.send(token);
};
