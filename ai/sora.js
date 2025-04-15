/ ai/sora.js
// SORA AI: Insight engine for predictive financial modeling, market sentiment analysis, and personalized dashboard recommendations

const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');

// Initialize Gemini Pro API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getModel({ model: "gemini-pro" });

async function getMarketData() {
  try {
    // Replace with your actual market data API endpoint
    const response = await axios.get('https://api.example.com/marketdata');
    return response.data;
  } catch (error) {
    console.error("Error fetching market data:", error);
    return "Error fetching market data. Please try again.";
  }
}

async function analyzeMarketSentiment(prompt) {
  // Fetch live market data
  const marketData = await getMarketData();

  // Augment prompt with market data
  const augmentedPrompt = `${prompt}\n\nLive Market Data: ${JSON.stringify(marketData)}`;

  try {
    const result = await model.generateContent(augmentedPrompt);
    const response = await result.response;
    const text = response.text();
    return text.trim();
  } catch (error) {
    console.error("Error analyzing market sentiment:", error);
    return "I'm sorry, I encountered an error. Please try again.";
  }
}

module.exports = { analyzeMarketSentiment };


