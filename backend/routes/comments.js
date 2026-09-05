const express = require('express');
const pool = require('../db');

const router = express.Router();

// GET comments by blog_id (public)
router.get('/:blog_id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM comments WHERE blog_id = $1 ORDER BY created_at DESC',
      [req.params.blog_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST comment (public)
router.post('/', async (req, res) => {
  try {
    const { blog_id, author_name, author_email, comment_text } = req.body;

    if (!blog_id || !author_name || !author_email || !comment_text) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const result = await pool.query(
      `INSERT INTO comments (blog_id, author_name, author_email, comment_text)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [blog_id, author_name, author_email, comment_text]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
