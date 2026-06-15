const express = require("express");
const { createCheckoutSession } = require("../controllers/stripe.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post(
  "/checkout",
  authMiddleware,
  createCheckoutSession
);

module.exports = router;