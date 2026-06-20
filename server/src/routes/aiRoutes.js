const express = require("express");
const router = express.Router();

const { generateSuggestion } = require("../controllers/ai.controller");
const validate = require("../middlewares/validate");
const { suggestionSchema } = require("../validators/aiValidator");
const { aiLimiter } = require("../middlewares/rateLimit.middleware");

router.post(
  "/suggest",
  aiLimiter,
  validate(suggestionSchema),
  generateSuggestion
);

module.exports = router;