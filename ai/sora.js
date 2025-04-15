// ai/sora.js
// SORA AI: Insight engine for predictive financial modeling, market sentiment analysis, and personalized dashboard recommendations

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini Pro API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getModel({ model: "gemini-pro" });

async function analyzeMarketSentiment(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text.trim();
  } catch (error) {
    console.error("Error analyzing market sentiment:", error);
    return "I'm sorry, I encountered an error. Please try again.";
  }
}

module.exports = { analyzeMarketSentiment };
