const express = require('express');
const router = express.Router();

const Testimonial = require('../models/testimonial');

router.post('/new', (req, res, next) => {
  let newTestimonial = new Testimonial({
    content: req.body.content,
    author: req.body.author
  });

  Testimonial.addTestimonial(newTestimonial, (err, testimonial) => {
    if (err) {
      res.json({
        success: false,
        message: 'Failed to add testimonial',
        error: err
      });
    } else {
      res.json({
        success: true,
        message: 'Testimonial Added',
        testimonial: testimonial
      });
    }
  });
});

module.exports = router;