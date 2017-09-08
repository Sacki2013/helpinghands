const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.register = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err; // TODO: Need more perm solution to error handling
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.listUsers = function(callback) {
  User.find(callback);
}

module.exports.getUser = function(id, callback) {
  User.findById(id, callback);
}