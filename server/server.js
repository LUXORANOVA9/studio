const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const whiteLabelRoutes = require('./routes/whiteLabelRoutes'); // Import whiteLabelRoutes
const billingRoutes = require('./routes/billingRoutes'); // Import billing routes

const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Stripe requires raw body
app.use('/whitelabel/webhook', bodyParser.raw({ type: 'application/json' }));


// Routes
app.use('/auth', authRoutes);
app.use('/api', dataRoutes);
app.use('/whitelabel', whiteLabelRoutes); // Use whiteLabelRoutes
app.use('/billing', billingRoutes); // Use billing routes

app.get('/', (req, res) => {
    res.send('LuxoraNova API is running');
});

// Placeholder endpoint for affiliate commission (to be connected with AI and tracking)
app.post('/api/track-referral-bonus', (req, res) => {
    const { referralId, amount } = req.body;
    // In production, you would:
    // 1. Verify that the referralId exists
    // 2. Credit the referring user the specified bonus amount
    // 3. Log the bonus transaction
    console.log(`Simulating awarding ${amount} to referrer ${referralId}`);
    res.status(200).send({ message: 'Referral bonus tracked successfully' });
});

// Webhook endpoints for automation
app.post('/webhook/new-client', (req, res) => {
  // Logic to handle new client webhooks (e.g., from Firebase)
  const clientData = req.body;
  console.log('New client webhook received:', clientData);

  // TODO: Integrate with Zapier, Notion API, Telegram/Slack
  // Example: Send email via Zapier, create task in Notion, send alert to Telegram

  res.status(200).send({ message: 'New client webhook processed' });
});

app.post('/webhook/nft-sale', (req, res) => {
  // Logic to handle NFT sale webhooks (e.g., from smart contract events)
  const saleData = req.body;
  console.log('NFT sale webhook received:', saleData);

  // TODO: Integrate with Zapier, Notion API, Telegram/Slack
  // Example: Send email via Zapier, update CRM in Notion, send alert to Telegram

  res.status(200).send({ message: 'NFT sale webhook processed' });
});

app.post('/webhook/ai-report', (req, res) => {
  // Logic to handle AI report webhooks (e.g., from SORA AI)
  const reportData = req.body;
  console.log('AI report webhook received:', reportData);

  // TODO: Integrate with Zapier, Notion API, Telegram/Slack
  // Example: Send email via Zapier, update analytics dashboard in Notion, send alert to Telegram

  res.status(200).send({ message: 'AI report webhook processed' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
