const _ = require("lodash");
const bcrypt = require("bcrypt");
const Rider = require("../models/rider.model");
const Driver = require("../models/driver.model");

exports.register = async (req, res) => {
  const type = req.header("type");
  let rolltype;
  if (type === "driver") rolltype = Driver;
  else rolltype = Rider;

  let user = await rolltype.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ message: "User already registered" });
  user = await rolltype.findOne({ phone: req.body.phone });
  if (user) return res.status(400).json({ message: "User already registered" });

  let Obj = JSON.parse(JSON.stringify(req.body));
  user = new rolltype(Obj);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  user.save();

  const token = user.generateAuthToken();
  const x = _.pick(user, ["_id", "name", "email", "password", "phone"]);
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(user);
};

exports.allusers = async (req, res) => {
  const type = req.header("type");
  let rolltype;
  if (type === "driver") rolltype = Driver;
  else rolltype = Rider;

  let user = await rolltype.find();
  res.send(user);
};
exports.oneuser = async (req, res) => {
  const type = req.header("type");
  let rolltype;
  if (type === "driver") rolltype = Driver;
  else rolltype = Rider;

  let user = await rolltype.findOne({ _id: req.params.id });
  res.send(user);
};
exports.update = async (req, res) => {
  const type = req.header("type");
  let rolltype;
  if (type === "driver") rolltype = Driver;
  else rolltype = Rider;

  let user = await rolltype.findOne({ _id: req.params.id });
  if (!user) return res.status(400).json({ message: "User does not exist" });

  let email = await rolltype.findOne({ email: req.body.email });
  let phone = await rolltype.findOne({ phone: req.body.phone });
  let Obj = JSON.parse(JSON.stringify(req.body));
  if (email)
    if (!(user.email === email.email))
      return res.status(400).json({ message: "Phone Or email already exists" });
  if (phone)
    if (!(user.phone === phone.phone))
      return res.status(400).json({ message: "Phone Or email already exists" });

  if (req.body.oldpassword) {
    const checkpass = await bcrypt.compare(req.body.oldpassword, user.password);
    if (!checkpass)
      return res.status(400).json({ message: "Invalid Credentials" });
    const salt = await bcrypt.genSalt(10);
    Obj.password = await bcrypt.hash(req.body.password, salt);
  }

  const updateUser = await rolltype.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: Obj,
    }
  );
  res.status(200).json({ updates: updateUser });
};
exports.updateloc = async (req, res) => {
  let rolltype = Driver;

  let user = await rolltype.findOne({ _id: req.params.id });
  if (!user) return res.status(400).json({ message: "User does not exist" });

  const updateUser = await rolltype.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: { currlocation: req.body.currlocation },
    }
  );
  res.status(200).json({ updates: updateUser });
};

exports.delete = async (req, res) => {
  const type = req.header("type");
  let rolltype;
  if (type === "driver") rolltype = Driver;
  else rolltype = Rider;

  let user = await rolltype.findOne({ _id: req.params.id });
  if (!user) return res.status(404).json({ message: "user dos not exist" });

  await rolltype.findByIdAndDelete({ _id: req.params.id });
  res.status(200).json({ message: `user deleted id : ${req.params.id}` });
};
