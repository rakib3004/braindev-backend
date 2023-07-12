const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[0-9]{11,15}$/.test(value);
      },
      message: 'Invalid phone number format',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
  },
  facultyName: {
    type: String,
    required: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
  classRoll: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },

  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  hallName: {
    type: String,
    required: true,
  },
  residentialType: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
