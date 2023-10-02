const mongoose = require('mongoose');

const userRegistrationSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mobileNo: {
    type: Number,
    required: true
  },
  userRole: {
    type: String,
    required: true
  }
}, {
  timestamps: true, // Add timestamps option here
}
)

module.exports = mongoose.model("User", userRegistrationSchema);