const express = require('express');
const { createUser, getUsers, getUser } = require('../controllers/userController.js');
const router = express.Router();

// GET  all users
router.get('/', getUsers);

// GET a single user
router.get('/:id', getUser);

// POST a new user
router.post('/', createUser);

// DELETE a single user
// router.delete('/:id', deleteUser);

// UPDATE a single user
// router.patch('/:id', updateUser);

module.exports = router;