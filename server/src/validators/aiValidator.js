const { z } = require("zod");

const suggestionSchema = z.object({
  prompt: z.string().min(5, "Prompt is required"),
});

module.exports = {
  suggestionSchema,
};