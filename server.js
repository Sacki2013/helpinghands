// Environment Variables
require('dotenv').config();

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');

// Files
const config = require('./config/database');
const Users = require('./routes/users');
const Testimonials = require('./routes/testimonials');

// Database
mongoose.connect(config.db);
mongoose.connection.on('connected', (err) => {
  if (err) { console.log(err) }
  console.log('Database Connected');
});

// Server / Port
const server = express();
const port = process.env.PORT || 3000;

// Middleware
server.use(cors());
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, 'client')));
server.use('/user', Users);
server.use('/testimonials', Testimonials);

// Start Server
server.listen(port, (err) => {
  if (err) { console.log(err) }
  console.log('Server Running');
});