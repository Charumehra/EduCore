const express = require("express");
const {registerUser, logoutUser, getUserInfo, loginUser} = require("../controllers/authController")
const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/info", getUserInfo);
router.post("/logout", logoutUser);


module.exports = router;