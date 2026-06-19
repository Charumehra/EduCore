const express = require("express");
const router = express.Router();

const { generateSuggestion } = require("../controllers/ai.controller");
const validate = require("../middlewares/validate");

const { suggestionSchema } = require("../validators/aiValidator");

router.post(
  "/suggest",
  validate(suggestionSchema),
  generateSuggestion
);

module.exports = router;