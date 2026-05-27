const express = require("express");
const app = express();
const authRoutes = require("./src/routes/authRoutes");
const courseRoutes = require("./src/routes/courseRoutes");

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

module.exports = app;
