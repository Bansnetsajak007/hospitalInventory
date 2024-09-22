const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 1,
  },

    PatientName:{
        type: String,
        required: true,
    },

    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
      },
      dob: {
        type: Date,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      phone: {
        type: String,
        required: true
      },
      address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
      },
      preferredDoctor: {
        type: String,
        required: false
      },
      purpose: {
        type: String,
        required: true
      }
})

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
