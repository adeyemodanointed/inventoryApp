const User = require('../models/user');

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const userController = require('../controllers/userController');

// Register a user
router.post('/register',
  [
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail(),
    body('password')
      .trim()
      .isEmpty()
      .isLength({min: 8}),
    body('name')
      .trim()
      .isEmpty(),
    body('userRole')
      .custom(value => {
        if(value != 1 || value != 2) {
          return Promise.reject('Invalid user role.');
        }
      })
  ], userController.register
);

// Login a user
router.post('/login',
  [
    body('email')
      .trim()
      .isEmail(),
    body('password')
      .trim()
      .isEmpty()
      .isLength({min: 8})
  ],
  userController.login
)

// Admin view all user
router.get('/')

// Admin delete user
router.delete('/delete/:userId');

module.exports = router;