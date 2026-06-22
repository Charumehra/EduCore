const express = require("express");
const app = express();
const lectureRoutes = require("./src/routes/lectureRoutes");
const authRoutes = require("./src/routes/authRoutes");
const courseRoutes = require("./src/routes/courseRoutes");
const stripeRoutes = require("./src/routes/stripe.Routes");
const aiRoutes = require("./src/routes/aiRoutes");
const cookieParser = require("cookie-parser");
require("./src/models/lecture");
require("./src/models/course");
const cors = require("cors"); 

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://charu-educore-main.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));


app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/ai", aiRoutes);
module.exports = app;
