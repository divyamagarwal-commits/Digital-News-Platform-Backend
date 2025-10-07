import db from '../config/database.js';

// Fetch all subscription plans
export const getSubscriptionPlans = () => {
  return db.prepare(`
    SELECT id, name, price, duration, features
    FROM subscription_plans
  `).all().map(plan => ({
    ...plan,
    features: JSON.parse(plan.features)
  }));
};

// Subscribe user to a plan
export const subscribeUser = ({ userId, planId, paymentMethod }) => {
  const stmt = db.prepare(`
    INSERT INTO subscriptions (user_id, plan_id, start_date, end_date, payment_method)
    VALUES (?, ?, date('now'), date('now', '+1 month'), ?)
  `);
  return stmt.run(userId, planId, paymentMethod);
};

// Get user's current subscription status
export const getUserSubscriptionStatus = (userId) => {
  const sub = db.prepare(`
    SELECT sp.id, sp.name, sp.price, sp.duration, sp.features, s.start_date, s.end_date
    FROM subscriptions s
    JOIN subscription_plans sp ON s.plan_id = sp.id
    WHERE s.user_id = ?
    ORDER BY s.end_date DESC
    LIMIT 1
  `).get(userId);

  if (!sub) return null;

  return {
    id: sub.id,
    name: sub.name,
    price: sub.price,
    duration: sub.duration,
    features: JSON.parse(sub.features),
    startDate: sub.start_date,
    endDate: sub.end_date
  };
};
