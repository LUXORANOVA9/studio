const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require('cors')({origin: true});
const { Configuration, OpenAI } = require("openai");

// Initialize OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAI(configuration);

exports.askLUXBot = onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      const { prompt } = request.body;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7,
      });

      const luxBotResponse = completion.choices[0].message.content.trim();
      response.status(200).send({ response: luxBotResponse });
    } catch (error) {
      logger.error("Error asking LUXBot:", error);
      response.status(500).send({ message: "Failed to get response from LUXBot", error: error.message });
    }
  });
});
