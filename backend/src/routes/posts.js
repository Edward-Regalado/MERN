const express = require('express');
const { createPost, getPost, getPosts, deletePost, updatePost } = require('../controllers/postController.js');
const router = express.Router();

// GET  all posts
router.get('/', getPosts);

// GET a single post
router.get('/:id', getPost);

// POST a new post
router.post('/', createPost);

// DELETE a single post
router.delete('/:id', deletePost);

// UPDATE a single post
router.patch('/:id', updatePost);

module.exports = router;