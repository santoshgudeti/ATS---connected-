/*const mongoose = require("mongoose");

const JobDetailsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: Buffer, required: true },
  filename: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});
 
module.exports = mongoose.model("JobDetails", JobDetailsSchema);
*/
const mongoose = require("mongoose");

const jobDetailsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: Buffer, required: true },
  filename: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const JobDetails = mongoose.model("JobDetails", jobDetailsSchema);
module.exports = JobDetails;