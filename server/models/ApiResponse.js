const ApiResponseSchema = new Schema({
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },
  jobDescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobDescription', required: true },
  matchingResult: {
    name: { type: String, default: null },
    email: { type: String, default: null },
    mobile_number: { type: String, default: null },
    "Matching Percentage": { type: Number, default: 0 },
    skills: { type: [String], default: [] },
    total_experience: { type: Number, default: 0 },
    file_url: { type: String, default: null },
  },
  createdAt: { type: Date, default: Date.now },
});
