const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PdfDetails", // Reference to the resume document
    required: true,
  },
  jobDescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobDetails", // Reference to the job description document
    required: true,
  },
  matchingResult: {
    type: Object, // Store the entire JSON result from the external API
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
