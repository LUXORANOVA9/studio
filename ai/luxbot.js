
// 📁 ai/luxbot.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function askLUXBot(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat();
  const result = await chat.sendMessage(prompt);
  return result.response.text();
}

// Example usage:
// askLUXBot("How do I onboard a high-net-worth client?").then(console.log);
