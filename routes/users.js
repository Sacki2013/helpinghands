const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  });

  User.register(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        message: 'Failed to add user',
        error: err
      });
    } else {
      res.json({
        success: true,
        message: 'User registered',
        user: user
      });
    }
  });
});

module.exports = router;