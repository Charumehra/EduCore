const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateSuggestion = async (req, res) => {
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    res.status(200).json({
      success: true,
      suggestion: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
};

module.exports = {
  generateSuggestion,
};
