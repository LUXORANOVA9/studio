// Mock backend for /api/subscribe (for local testing)
import express from 'express';
const router = express.Router();

router.post('/api/subscribe', (req, res) => {
  const { email, priceId } = req.body;
  console.log('✅ /api/subscribe received:', { email, priceId });

  if (!email || !priceId || priceId !== 'test_price_id') {
    return res.status(400).json({ error: 'Missing or invalid email/priceId' });
  }

  // Simulate success response from Stripe Checkout session
  res.json({
    url: 'https://checkout.stripe.com/pay/mock-checkout-session-url'
  });
});

export default router;