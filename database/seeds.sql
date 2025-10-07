-- SEED DATA

-- Users
INSERT INTO users (name, email, password_hash, subscription_status)
VALUES 
('Alice Johnson', 'alice@example.com', 'hashed_pw_1', 'premium'),
('Bob Smith', 'bob@example.com', 'hashed_pw_2', 'free'),
('Charlie Lee', 'charlie@example.com', 'hashed_pw_3', 'premium');

-- Authors
INSERT INTO authors (user_id, bio, credentials, social_links, verified)
VALUES
(1, 'Tech journalist with 10 years of experience', 'B.A. Journalism', '{"twitter": "@alicewrites"}', TRUE),
(2, 'Political analyst and columnist', 'M.A. Political Science', '{"linkedin": "bob-smith"}', TRUE);

-- Categories
INSERT INTO categories (name, slug, priority)
VALUES
('Politics', 'politics', 1),
('Sports', 'sports', 2),
('Business', 'business', 3),
('Technology', 'technology', 4),
('Health', 'health', 5);

-- Articles
INSERT INTO articles (title, summary, content, category_id, article_type, tags, is_featured)
VALUES
('Election Results 2025', 'Latest updates from the national elections.', 'Full article content...', 1, 'news', '{"elections","politics"}', TRUE),
('Tech Trends 2025', 'A deep dive into the upcoming technology landscape.', 'Full article content...', 4, 'editorial', '{"AI","innovation"}', TRUE);

-- Article Authors
INSERT INTO article_authors (article_id, author_id, is_primary)
VALUES
(1, 2, TRUE),
(2, 1, TRUE);

-- Comments
INSERT INTO comments (article_id, user_id, content, moderation_status)
VALUES
(1, 2, 'Great coverage!', 'approved'),
(2, 3, 'Exciting insights about AI.', 'approved');

-- Bookmarks
INSERT INTO bookmarks (user_id, article_id)
VALUES
(3, 2);

-- Reading History
INSERT INTO reading_history (user_id, article_id, duration_seconds)
VALUES
(2, 1, 180),
(3, 2, 240);

-- Subscriptions
INSERT INTO subscriptions (user_id, plan_name, end_date, access_level)
VALUES
(1, 'Monthly Premium', NOW() + INTERVAL '30 days', 'premium');

-- Payments
INSERT INTO payments (subscription_id, amount, payment_method)
VALUES
(1, 9.99, 'credit_card');

-- Breaking News
INSERT INTO breaking_news (title, content, priority, push_notification, expires_at)
VALUES
('Major Earthquake Hits City', 'Details emerging about the 7.2 magnitude quake...', 10, TRUE, NOW() + INTERVAL '6 hours');

-- Polls and Options
INSERT INTO polls (question) VALUES ('Do you support renewable energy investments?');
INSERT INTO poll_options (poll_id, option_text, vote_count)
VALUES (1, 'Yes', 120), (1, 'No', 45), (1, 'Not Sure', 30);

-- Media Gallery
INSERT INTO media_gallery (media_type, url, caption, credit)
VALUES
('image', 'https://example.com/photo1.jpg', 'Election night crowd', 'Photo by Reuters'),
('video', 'https://example.com/video1.mp4', 'Press conference highlights', 'Video by CNN');
