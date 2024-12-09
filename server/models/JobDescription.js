const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobDescriptionSchema = new Schema({
  title: {
    type: String,
    required: true, // Title of the job description
  },
  description: {
    type: Buffer,
    required: true, // Binary data of the job description PDF
  },
  filename: {
    type: String,
    required: true, // Filename of the uploaded job description
  },
  uploadedAt: {
    type: Date,
    default: Date.now, // Timestamp when the job description is uploaded
  },
});

module.exports = mongoose.model('JobDescription', JobDescriptionSchema);
