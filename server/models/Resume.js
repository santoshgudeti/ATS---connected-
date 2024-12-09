const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResumeSchema = new Schema({
  title: {
    type: String,
    required: true, // Title of the resume
  },
  pdf: {
    type: Buffer,
    required: true, // Binary data of the PDF
  },
  filename: {
    type: String,
    required: true, // Filename of the uploaded resume
  },
  uploadedAt: {
    type: Date,
    default: Date.now, // Timestamp when the resume is uploaded
  },
});

module.exports = mongoose.model('Resume', ResumeSchema);
