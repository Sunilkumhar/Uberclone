const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Acess Denied. Token not provided" });

  try {
    const decoded = jwt.verify(token, process.env.uber_jwtprivate);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
module.exports = auth;
