-- Seed script for Jeet's Journal
-- Run this after creating the schema to populate sample data

-- Insert admin user (password: admin123)
INSERT INTO admins (username, password_hash) VALUES
('admin', '$2b$10$rZ3qK9vX5yH7wN1mK6fO4.xVwY8tQ2nP3sR4mL5cU6bA7dE8fG9hI');

-- Insert sample blog posts
INSERT INTO blogs (title, slug, content, excerpt, category, tags, reading_time, likes, published) VALUES
(
  'Getting Started with Node.js and Express',
  'getting-started-nodejs-express',
  '<h2>Introduction</h2><p>Node.js has revolutionized backend development by allowing developers to use JavaScript on the server side. Express.js, a minimal and flexible framework, makes building web applications straightforward and enjoyable.</p><h2>Why Express?</h2><p>Express provides a robust set of features for web and mobile applications. It simplifies routing, middleware integration, and request handling while keeping your codebase clean and maintainable.</p><h2>Building Your First API</h2><p>Start by installing Express with npm install express, then create a simple server that listens on port 3000. With just a few lines of code, you can handle HTTP requests and send responses.</p><p>Express middleware functions have access to request and response objects, allowing you to modify them or end the request-response cycle. This makes it easy to add authentication, logging, or error handling across your application.</p>',
  'Learn how to build modern web applications with Node.js and Express framework from scratch.',
  'Web Development',
  ARRAY['nodejs', 'express', 'javascript', 'backend'],
  8,
  42,
  true
),
(
  'Understanding PostgreSQL Indexes',
  'understanding-postgresql-indexes',
  '<h2>What Are Indexes?</h2><p>Database indexes are special lookup tables that the database search engine can use to speed up data retrieval. An index is a pointer to data in a table, much like an index in a book.</p><h2>Types of Indexes</h2><p>PostgreSQL supports several index types: B-tree (default), Hash, GiST, SP-GiST, GIN, and BRIN. Each serves different use cases and query patterns.</p><h2>When to Use Indexes</h2><p>Create indexes on columns frequently used in WHERE clauses, JOIN conditions, or ORDER BY clauses. However, indexes come with trade-offs: they speed up reads but slow down writes, and they consume disk space.</p><p>Monitor query performance with EXPLAIN ANALYZE to identify slow queries that would benefit from indexes. Sometimes a well-placed index can turn a multi-second query into milliseconds.</p>',
  'Deep dive into PostgreSQL indexes, their types, and when to use them for optimal database performance.',
  'Web Development',
  ARRAY['postgresql', 'database', 'performance', 'sql'],
  10,
  38,
  true
),
(
  'Building RESTful APIs: Best Practices',
  'restful-api-best-practices',
  '<h2>REST Principles</h2><p>REST (Representational State Transfer) is an architectural style for distributed systems. RESTful APIs use HTTP methods explicitly and are stateless, meaning each request contains all information needed to process it.</p><h2>HTTP Methods</h2><p>Use GET for retrieval, POST for creation, PUT for updates, and DELETE for removal. These standard methods make your API intuitive and predictable for other developers.</p><h2>Status Codes Matter</h2><p>Return appropriate HTTP status codes: 200 for success, 201 for created resources, 400 for client errors, 404 for not found, and 500 for server errors. Clear status codes help clients handle responses correctly.</p><h2>API Versioning</h2><p>Version your API from day one. Use URL versioning (/api/v1/) or header-based versioning to ensure backward compatibility as your API evolves.</p>',
  'Master the principles and best practices for designing clean, maintainable RESTful APIs.',
  'Web Development',
  ARRAY['rest', 'api', 'backend', 'best-practices'],
  7,
  56,
  true
),
(
  'Introduction to AI and Machine Learning',
  'introduction-ai-machine-learning',
  '<h2>What is AI?</h2><p>Artificial Intelligence refers to computer systems that can perform tasks typically requiring human intelligence, such as visual perception, speech recognition, and decision-making.</p><h2>Machine Learning Basics</h2><p>Machine Learning is a subset of AI where systems learn from data rather than being explicitly programmed. Models improve their performance on tasks through experience and training data.</p><h2>Types of Learning</h2><p>Supervised learning uses labeled data to train models, unsupervised learning finds patterns in unlabeled data, and reinforcement learning trains agents through rewards and penalties.</p><p>The field is rapidly evolving, with deep learning and neural networks achieving remarkable results in image recognition, natural language processing, and game playing.</p>',
  'A beginner-friendly introduction to artificial intelligence and machine learning concepts.',
  'AI',
  ARRAY['ai', 'machine-learning', 'technology'],
  6,
  71,
  true
),
(
  'JWT Authentication Explained',
  'jwt-authentication-explained',
  '<h2>What is JWT?</h2><p>JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims between two parties. They are commonly used for authentication and information exchange in web applications.</p><h2>Structure of a JWT</h2><p>A JWT consists of three parts: Header (algorithm and token type), Payload (claims about the user), and Signature (verifies the token hasn''t been tampered with). These parts are Base64-encoded and joined with dots.</p><h2>How It Works</h2><p>When a user logs in, the server generates a JWT and sends it to the client. The client stores it and includes it in subsequent requests. The server verifies the signature to authenticate requests without maintaining session state.</p><h2>Security Considerations</h2><p>Store JWTs securely (httpOnly cookies or localStorage with XSS protection), use short expiration times, implement refresh tokens for long sessions, and always validate tokens on the server side.</p>',
  'Learn how JWT authentication works and how to implement it securely in your applications.',
  'Web Development',
  ARRAY['jwt', 'authentication', 'security', 'nodejs'],
  9,
  63,
  true
),
(
  'CSS Grid vs Flexbox: When to Use Each',
  'css-grid-vs-flexbox',
  '<h2>Two Powerful Layout Systems</h2><p>CSS Grid and Flexbox are both powerful layout systems, but they excel at different tasks. Understanding when to use each will make your layouts cleaner and more maintainable.</p><h2>Flexbox for One Dimension</h2><p>Flexbox is designed for one-dimensional layouts—either rows or columns. It''s perfect for navigation bars, card layouts, and centering content. Flex items can grow, shrink, and wrap based on available space.</p><h2>Grid for Two Dimensions</h2><p>CSS Grid handles two-dimensional layouts simultaneously—rows and columns together. It''s ideal for page layouts, image galleries, and complex responsive designs where you need precise control over both axes.</p><h2>Using Them Together</h2><p>The best approach often combines both: use Grid for the overall page structure and Flexbox for components within grid cells. They complement each other perfectly.</p>',
  'Understand the differences between CSS Grid and Flexbox and learn when to use each layout system.',
  'Web Development',
  ARRAY['css', 'grid', 'flexbox', 'layout'],
  7,
  49,
  true
);

-- Insert sample comments
INSERT INTO comments (blog_id, author_name, author_email, comment_text) VALUES
(1, 'Sarah Chen', 'sarah.chen@example.com', 'Great introduction! This helped me understand Express middleware much better.'),
(1, 'Mike Johnson', 'mike.j@example.com', 'Could you cover error handling in Express in a future post?'),
(2, 'Alex Kumar', 'alex.k@example.com', 'Very useful explanation of indexes. The performance tips are gold.'),
(3, 'Emma Wilson', 'emma.w@example.com', 'API versioning is something I always forget. Thanks for the reminder!'),
(4, 'David Park', 'david.park@example.com', 'Nice intro to ML! Looking forward to more AI content.'),
(5, 'Lisa Anderson', 'lisa.a@example.com', 'The JWT security section is particularly helpful. Bookmarked!');

-- Insert sample contact messages
INSERT INTO contact_messages (name, email, subject, message, read) VALUES
('John Smith', 'john.smith@example.com', 'Collaboration Opportunity', 'Hi Jeet, I really enjoyed your posts on web development. Would you be interested in collaborating on a project?', false),
('Rachel Green', 'rachel.g@example.com', 'Question about PostgreSQL', 'Your article on indexes was great! I have a question about GIN indexes for full-text search. Could you elaborate?', false),
('Tom Brown', 'tom.brown@example.com', 'Speaking Engagement', 'We are organizing a tech meetup and would love to have you as a speaker. Are you available in October?', true);
