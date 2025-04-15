const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { askLUXBot } = require("./luxbot");
const { getSORAInsight } = require("./sora");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post("/ask-luxbot", async (req, res) => {
  const reply = await askLUXBot(req.body.prompt);
  res.send({ reply });
});

app.post("/sora", async (req, res) => {
  const reply = await getSORAInsight(req.body.topic);
  res.send({ reply });
});

exports.api = functions.https.onRequest(app);
