const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');
const { verifyToken } = require('../auth/firebaseAdmin');

router.get('/status', verifyToken, billingController.getSubscriptionStatus);
router.post('/create-checkout-session', verifyToken, billingController.createCheckoutSession);
router.post('/webhook', billingController.stripeWebhook); // Stripe webhook, no auth

module.exports = router;
