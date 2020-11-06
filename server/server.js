const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const travelRouter = require("./routes/travel");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

if (!process.env.uber_jwtprivate) {
  console.log("FATAL ERROR : jwtprivate key not defined.");
  process.exit(1);
}

const URI = process.env.ATLAS_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB...");
});
app.use("/", registerRouter);
app.use("/login", loginRouter);
app.use("/", travelRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("uber_c/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "uber_c", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}.`);
});
