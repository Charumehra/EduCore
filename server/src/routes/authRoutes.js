const express = require("express");
const {registerUser, logoutUser, getUserInfo, loginUser} = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/info",authMiddleware, getUserInfo);
router.post("/logout", logoutUser);


module.exports = router;