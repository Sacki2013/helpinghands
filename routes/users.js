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

router.get('/list', (req, res, next) => {
  User.listUsers((err, users) => {
    if (err) {
      res.json({
        success: false,
        message: 'CREATE ERROR MESSAGE',
        error: err // TODO: More specific error message
      });
    } else {
      res.json({
        success: true,
        users: users
      });
    }
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  User.getUser(id, (err, user) => {
    if (err) {
      res.json({
        success: false,
        message: 'No user found',
        error: err // TODO: More specific error message
      });
    } else {
      res.json({
        success: true,
        user: user
      });
    }
  });
});

module.exports = router;