const express = require("express");
const {registerUser, logoutUser, getUserInfo, loginUser} = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();
const { registerSchema, loginSchema } = require("../validators/authValidator");
const validate = require("../middlewares/validate.middleware");

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/info", authMiddleware, getUserInfo);
router.post("/logout", authMiddleware, logoutUser);


module.exports = router;