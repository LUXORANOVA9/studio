/ ai/luxbot.js
// LUXBot: GPT-powered virtual assistant for user onboarding, FAQ, lead conversion, and CRM sync

const { OpenAI } = require('openai');
const { Pinecone } = require('@pinecone-database/pinecone');

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
  const augmentedPrompt = `Use the following context to answer the question. If the context is not relevant, answer the question to the best of your ability.\n\nContext: ${context}\n\nQuestion: ${prompt}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are a helpful virtual assistant." },
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

module.exports = { generateResponse };
