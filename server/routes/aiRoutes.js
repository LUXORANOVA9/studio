
const express = require('express');
const router = express.Router();
const { generateResponse, onboardUser, captureLead } = require('../ai/luxbot');

// Endpoint to ask LUXBot a question
router.post('/ask-luxbot', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await generateResponse(prompt);
    res.status(200).send({ response });
  } catch (error) {
    console.error("Error asking LUXBot:", error);
    res.status(500).send({ message: "Failed to get response from LUXBot", error: error.message });
  }
});

// Endpoint to onboard a user
router.post('/onboard-user', async (req, res) => {
  try {
    const userInfo = req.body;
    const response = await onboardUser(userInfo);
    res.status(200).send({ response });
  } catch (error) {
    console.error("Error onboarding user:", error);
    res.status(500).send({ message: "Failed to onboard user", error: error.message });
  }
});

// Endpoint to capture a lead
router.post('/capture-lead', async (req, res) => {
  try {
    const leadInfo = req.body;
    const response = await captureLead(leadInfo);
    res.status(200).send({ response });
  } catch (error) {
    console.error("Error capturing lead:", error);
    res.status(500).send({ message: "Failed to capture lead", error: error.message });
  }
});

module.exports = router;
