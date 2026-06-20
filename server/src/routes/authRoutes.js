const express = require("express");
const {registerUser, logoutUser, getUserInfo, loginUser} = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();
const { registerSchema, loginSchema } = require("../validators/authValidator");
const validate = require("../middlewares/validate");
const { loginLimiter } = require("../middlewares/rateLimit.middleware");

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", loginLimiter, validate(loginSchema), loginUser);
router.get("/info", authMiddleware, getUserInfo);
router.post("/logout", authMiddleware, logoutUser);


module.exports = router;