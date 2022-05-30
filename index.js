require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const tokenVerification = require("./middleware/tokenVerification");

app.use(express.json());
app.use(cors());

function setupCORS(req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-type,Accept,X-Access-Token,X-Key"
  );
  res.header("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
}
app.all("/*", setupCORS);

const connection = require("./db");
connection();

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const userInfoRoutes = require("./routes/usersInfo");
// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use(tokenVerification);
app.use("/api/info", userInfoRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`));
