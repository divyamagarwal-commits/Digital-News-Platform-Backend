import { getSubscriptionPlans, subscribeUser, getUserSubscriptionStatus } from '../models/subscription.js';

// GET /plans
export const fetchPlans = (req, res) => {
  try {
    const plans = getSubscriptionPlans();
    res.json({ success: true, plans });
  } catch (err) {
    console.error('Fetch Plans Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch subscription plans' });
  }
};

// POST /subscribe
export const subscribe = (req, res) => {
  try {
    const userId = req.user.id;
    const { planId, paymentMethod } = req.body;

    subscribeUser({ userId, planId, paymentMethod });

    res.json({ success: true, message: 'Subscription successful' });
  } catch (err) {
    console.error('Subscribe Error:', err);
    res.status(500).json({ success: false, message: 'Failed to subscribe' });
  }
};

// GET /status
export const subscriptionStatus = (req, res) => {
  try {
    const userId = req.user.id;
    const status = getUserSubscriptionStatus(userId);

    res.json({ success: true, status });
  } catch (err) {
    console.error('Subscription Status Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch subscription status' });
  }
};
