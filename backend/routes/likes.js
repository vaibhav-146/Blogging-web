const express = require('express');
const pool = require('../db');

const router = express.Router();

// POST increment likes (public)
router.post('/:blog_id/like', async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE blogs SET likes = likes + 1 WHERE id = $1 RETURNING likes',
      [req.params.blog_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ likes: result.rows[0].likes });
  } catch (error) {
    console.error('Error incrementing likes:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
