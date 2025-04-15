
// ai/luxbot.js
// LUXBot v1: GPT-powered virtual assistant for user onboarding, FAQ, lead conversion, CRM sync, and $LUXO token management
// Built using OpenAI or Gemini API, connected to /api/ask-luxbot backend, integrates onboarding script, lead capture, chatbot simulation, and token interactions

const { OpenAI } = require('openai');
const { Pinecone } = require('@pinecone-database/pinecone');
const { admin } = require('../auth/firebaseAdmin'); // Import Firebase Admin SDK

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Pinecone for vector storage
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});

const index = pinecone.Index("luxbot-index"); // Replace with your Pinecone index name

async function getRelevantContext(query) {
  try {
    const queryEmbedding = await openai.embeddings.create({
      input: query,
      model: "text-embedding-ada-002",
    });

    const queryVector = queryEmbedding.data[0].embedding;

    const results = await index.query({
      vector: queryVector,
      topK: 5, // Number of results to return
      includeMetadata: true,
    });

    // Extract text from the hits
    const context = results.matches.map((hit) => hit.metadata.text).join("\n");
    return context;

  } catch (error) {
    console.error("Error getting relevant context from Pinecone:", error);
    return ""; // Return an empty string if there is an error
  }
}

async function generateResponse(prompt) {
  // Get relevant context from Pinecone
  const context = await getRelevantContext(prompt);

  // Modify the prompt to include the context
  const augmentedPrompt = `You are a helpful virtual assistant named LUXBot. You are responsible for user onboarding, answering FAQs, lead conversion, CRM sync, and helping users manage their $LUXO tokens. Use the following context to answer the question. If the context is not relevant, answer the question to the best of your ability.\n\nContext: ${context}\n\nQuestion: ${prompt}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are LUXBot, a helpful virtual assistant." },
                 { role: "user", content: augmentedPrompt }],
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

// Function to simulate user onboarding
async function onboardUser(userInfo) {
  // Extract relevant information from userInfo
  const { userId, name, email } = userInfo;

  // Use the information to create a personalized onboarding message
  const onboardingMessage = `Welcome to LuxoraNova, ${name}! We're excited to have you on board. Here are a few steps to get started:\n1. Set up your profile.\n2. Explore the dashboard.\n3. Connect your wallet to claim your initial $LUXO tokens.\n4. Contact support if you need any help.`;

  try {
    // You can also log the onboarding event in your database
    console.log(`User ${userId} onboarded successfully.`);

    // Return a success message
    return onboardingMessage;
  } catch (error) {
    console.error("Error onboarding user:", error);
    return "I'm sorry, I encountered an error. Please try again.";
  }
}

// Function to simulate lead capture
async function captureLead(leadInfo) {
  // Extract relevant information from leadInfo
  const { name, email, message } = leadInfo;

  try {
    // You can also log the lead capture event in your database
    console.log(`Lead captured successfully: ${name} - ${email}`);

    // Return a success message
    return "Thank you for your interest in LuxoraNova! We will get back to you soon.";
  } catch (error) {
    console.error("Error capturing lead:", error);
    return "I'm sorry, I encountered an error. Please try again.";
  }
}

// Simulates trackReferralBonus with potential NFT airdrop reward.
async function trackReferralBonus(referralId, amount) {
    try {
        // 1. Verify that the referralId exists (get the referring user).
        const referringUser = await admin.auth().getUser(referralId);

        if (!referringUser) {
            console.log(`Referral ID ${referralId} not found.`);
            return "Referral ID not found.";
        }

        // 2. Credit the referring user the specified bonus amount (simulated here).
        console.log(`Simulating awarding ${amount} to referrer ${referralId}`);

        // 3. Check if the bonus amount qualifies for an NFT airdrop.
        if (amount >= 1000) {  // Example threshold: Bonus >= 1000 qualifies for NFT
            // Simulate NFT airdrop logic (mint NFT to referring user)
            const nftType = "Gold"; // You can determine NFT type based on bonus amount
            console.log(`Simulating NFT (${nftType}) airdrop to user ${referralId}`);

            // Simulate awarding $LUXO tokens for the referral
            const luxoRewardAmount = 500; // Example: Reward 500 $LUXO tokens
            console.log(`Simulating awarding ${luxoRewardAmount} $LUXO tokens to user ${referralId}`);
            return `Successfully credited bonus, triggered NFT (${nftType}) airdrop, and awarded ${luxoRewardAmount} $LUXO tokens!`;
        }

        return "Referral bonus tracked successfully.";
    } catch (error) {
        console.error("Error tracking referral bonus:", error);
        return "Error tracking referral bonus.";
    }
}

module.exports = { generateResponse, onboardUser, captureLead, trackReferralBonus };
