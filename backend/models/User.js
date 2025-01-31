const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  device_id: {
    type: String,
    unique: true,
    required: [true, 'Device ID is required']
  },
  full_name: {
    type: String,
    required: [true, 'Full name is required']
  },
  password_hash: {
    type: String,
    required: [true, 'Password hash is required']
  },
  profile_picture: {
    type: String,
    default: null
  },
  verified: {
    type: Boolean,
    default: false
  },
  phone_number: {
    type: String,
    unique: true,
    sparse: true // Allows multiple null values
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date,
    default: null
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Index for faster queries
userSchema.index({ device_id: 1 });
userSchema.index({ phone_number: 1 }, { sparse: true });

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password_hash);
};

const User = mongoose.model('User', userSchema);
module.exports = User; 