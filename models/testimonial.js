const mongoose = require('mongoose');

const TestimonialSchema = mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true }
});

const Testimonial = module.exports = mongoose.model('Testimonial', TestimonialSchema);

module.exports.addTestimonial = function(newTestimonial, callback) {
  newTestimonial.save(callback);
}