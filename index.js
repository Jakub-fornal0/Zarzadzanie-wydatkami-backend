require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const tokenVerification = require("./middleware/tokenVerification");

app.use(express.json());
app.use(cors());

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
