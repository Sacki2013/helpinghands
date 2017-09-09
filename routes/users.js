const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/database');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    gdcReg: req.body.gdcReg,
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

router.post('/authenticate', (req, res, next) => {
  let userName = req.body.userName;
  let password = req.body.password;

  User.getUserByUsername(userName, (err, user) => {
    if (err) throw err; // TODO: Improve this response to err

    if (!user) {
      res.json({
        success: false,
        message: 'User not found'
      });
    }
    let signedUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      admin: user.admin
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err; // TODO: Improve this response to err
      if (isMatch) {
        const token = jwt.sign(signedUser, "secret", { // TODO: Change secret to config.secret
          expiresIn: 604800 // A week
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: signedUser
        });
      } else {
        res.json({
          success: false,
          message: 'Incorrect Password'
        })
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({
    user: req.user
  });
});

module.exports = router;