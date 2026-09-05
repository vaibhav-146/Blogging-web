const express = require('express');
const authMiddleware = require('../middleware/auth');
const pool = require('../db');

const router = express.Router();

// GET all blogs including drafts (admin only)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all published blogs (public)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = 'SELECT * FROM blogs WHERE published = true';
    const params = [];

    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (title ILIKE $${params.length} OR content ILIKE $${params.length})`;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single blog by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM blogs WHERE slug = $1 AND published = true',
      [req.params.slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create blog (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, slug, content, excerpt, category, tags, reading_time, published } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ error: 'Title, slug, and content required' });
    }

    const result = await pool.query(
      `INSERT INTO blogs (title, slug, content, excerpt, category, tags, reading_time, published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, slug, content, excerpt, category, tags, reading_time, published || false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Slug already exists' });
    }
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update blog (protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, slug, content, excerpt, category, tags, reading_time, published } = req.body;

    const result = await pool.query(
      `UPDATE blogs SET title = $1, slug = $2, content = $3, excerpt = $4, category = $5,
       tags = $6, reading_time = $7, published = $8, updated_at = CURRENT_TIMESTAMP
       WHERE id = $9 RETURNING *`,
      [title, slug, content, excerpt, category, tags, reading_time, published, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Slug already exists' });
    }
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE blog (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM blogs WHERE id = $1 RETURNING id',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
