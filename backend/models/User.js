const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  ime: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  lozinka: {
    type: String,
    required: true
  },
  uloga: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)