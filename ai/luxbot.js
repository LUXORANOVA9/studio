// ai/luxbot.js
// LUXBot: GPT-powered virtual assistant for user onboarding, FAQ, lead conversion, and CRM sync

const { OpenAI } = require('openai');

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateResponse(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are a helpful virtual assistant." },
                 { role: "user", content: prompt }],
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating response:", error);
    return "I'm sorry, I encountered an error. Please try again.";
  }
}

module.exports = { generateResponse };
