const express = require("express");
const app = express();
const lectureRoutes = require("./src/routes/lectureRoutes");
const authRoutes = require("./src/routes/authRoutes");
const courseRoutes = require("./src/routes/courseRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors"); 

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://prodesk-capstone-edu-core-git-main-charumehras-projects.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));


app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lectures", lectureRoutes);

module.exports = app;
