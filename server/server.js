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

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
