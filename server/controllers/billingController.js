const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { admin } = require('../auth/firebaseAdmin');

// Function to get subscription status
exports.getSubscriptionStatus = async (req, res) => {
  try {
    // TODO: Fetch subscription status from Stripe or your database
    const userId = req.user.uid; // Firebase UID
    // Placeholder: Replace with actual data retrieval logic
    const status = 'active'; // Example status
    const customerId = 'cus_XXX'; // Example customer ID
    res.status(200).json({ status, customerId });
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    res.status(500).send({ message: 'Failed to fetch subscription status', error: error.message });
  }
};

// Function to create a Stripe checkout session
exports.createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user.uid; // Firebase UID
    // TODO: Fetch user data from Firebase and determine the appropriate Stripe Price ID based on the selected tier
    const priceId = process.env.STRIPE_PRICE_ID; // Example Price ID

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.CLIENT_URL}/client?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/client?canceled=true`,
      customer_email: req.user.email, // Use Firebase email
      metadata: { userId: userId }, // Attach Firebase UID to the session
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ message: 'Failed to create checkout session', error: error.message });
  }
};

// Stripe webhook to handle subscription events
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle different event types
  switch (event.type) {
    case 'checkout.session.completed':
      // When a checkout session is completed, especially useful for subscriptions
      const session = event.data.object;
      const userId = session.metadata.userId; // Get Firebase UID from session metadata
      const stripeCustomerId = session.customer;

      // TODO: Store the Stripe customer ID in Firebase or your database, linked to the Firebase UID
      console.log(`User ${userId} completed checkout session. Stripe Customer ID: ${stripeCustomerId}`);
      break;
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      const stripeCustomerId = subscription.customer;

      // TODO: Update subscription status in Firebase or your database
      console.log(`Subscription status updated for customer ${stripeCustomerId}. Status: ${subscription.status}`);
      break;
    // Handle other event types as needed
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('Webhook received');
};
