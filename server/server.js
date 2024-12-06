const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const { Schema } = mongoose;

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://santoshgudeti:GUDETIsantosh@cluster0.7wsub.mongodb.net/santosh?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Mongoose Schemas
const ResumeSchema = new Schema({
  title: String,
  pdf: Buffer,
  filename: String,
  uploadedAt: { type: Date, default: Date.now },
});

const JobDescriptionSchema = new Schema({
  title: String,
  description: Buffer,
  filename: String,
  uploadedAt: { type: Date, default: Date.now },
});

const Resume = mongoose.model('Resume', ResumeSchema);
const JobDescription = mongoose.model('JobDescription', JobDescriptionSchema);

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API Endpoint
app.post('/api/submit', upload.fields([{ name: 'resume' }, { name: 'job_description' }]), async (req, res) => {
  try {
    const { files } = req;
    console.log('Received Request Body:', req.body);
    console.log('Received Files:', files);

    if (!files || !files.resume || !files.job_description) {
      return res.status(400).json({ error: 'Resumes and job descriptions are required.' });
    }

    // Save resumes to MongoDB
    const resumes = files.resume.map((file) => ({
      title: 'Uploaded Resume',
      pdf: file.buffer,
      filename: file.originalname,
    }));

    const savedResumes = await Resume.insertMany(resumes);

    // Save job descriptions to MongoDB
    const jobDescriptions = files.job_description.map((file) => ({
      title: 'Uploaded Job Description',
      description: file.buffer,
      filename: file.originalname,
    }));

    const savedJobDescriptions = await JobDescription.insertMany(jobDescriptions);

    // Call external API for each resume and job description
    const FormData = require('form-data'); // Import form-data package

    // Inside your API endpoint
    const results = [];
    for (const resume of savedResumes) {
      for (const jobDescription of savedJobDescriptions) {
        const formData = new FormData();
        formData.append("resume", resume.pdf, { filename: resume.filename });
        formData.append("job_description", jobDescription.description, { filename: jobDescription.filename });
    
        console.log("Preparing FormData for External API...");
    
        try {
          const externalApiResponse = await axios.post(
            "https://l75o0ebez8.execute-api.ap-south-1.amazonaws.com/candidates",
            formData,
            {
              headers: formData.getHeaders(), // Properly set Content-Type with boundary
            }
          );
    
          console.log("External API Response:", externalApiResponse.data);
    
          results.push({
            resume: resume._id,
            jobDescription: jobDescription._id,
            matchingResult: externalApiResponse.data,
          });
        } catch (apiError) {
          console.error("External API Error:", apiError.response?.data || apiError.message);
        }
      }
    }
    

    res.status(200).json({ message: 'Files processed successfully.', results });
  } catch (error) {
    console.error('Error while processing files:', error.message);
    res.status(500).json({ error: 'Failed to process files.', details: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


/*
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const FormData = require("form-data");

// Models
const Candidate = require("./models/Candidate");
const PdfDetails = require("./models/PdfDetails");
const JobDetails = require("./models/JobDetails");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MongoDB Connection
mongoose.connect("mongodb+srv://santoshgudeti:GUDETIsantosh@cluster0.7wsub.mongodb.net/santosh?retryWrites=true&w=majority");

// MongoDB Debugging
mongoose.connection.on("error", (err) => console.error("MongoDB error:", err));
mongoose.connection.once("open", () => console.log("Connected to MongoDB successfully!"));

// File Submission Route
// File Submission Route  1
app.post(
  "/api/submit",
  upload.fields([{ name: "resume" }, { name: "job_description" }]),
  async (req, res) => {
    try {
      // Validate files
      if (!req.files || !req.files["resume"] || !req.files["job_description"]) {
        return res.status(400).json({ error: "Missing resume or job description files" });
      }

      // Extract files
      const resumeFile = req.files["resume"][0];
      const jobDescriptionFile = req.files["job_description"][0];

      // Save Resume to PdfDetails Collection
      const savedResume = await PdfDetails.create({
        title: "Uploaded Resume",
        pdf: resumeFile.buffer,
        filename: resumeFile.originalname,
        uploadedAt: new Date(),
      });

      // Save Job Description to JobDetails Collection
      const savedJobDescription = await JobDetails.create({
        title: "Uploaded Job Description",
        description: jobDescriptionFile.buffer,
        filename: jobDescriptionFile.originalname,
        uploadedAt: new Date(),
      });

      // Prepare FormData for External API
      const formData = new FormData();
      formData.append("resume", resumeFile.buffer, resumeFile.originalname);
      formData.append("job_description", jobDescriptionFile.buffer, jobDescriptionFile.originalname);

      const config = {
        headers: {
          ...formData.getHeaders(),
        },
      };

      // Submit data to external API for matching
      const response = await axios.post(
        "https://l75o0ebez8.execute-api.ap-south-1.amazonaws.com/candidates", // Replace with the actual API endpoint
        formData,
        config
      );

      // Check if the response contains candidate matching data
      const candidateMatchingResult = response.data; // This should be the JSON result from the external API

      // Store candidate matching result in the Candidate collection
      const savedCandidate = await Candidate.create({
        resume: savedResume._id,
        jobDescription: savedJobDescription._id,
        matchingResult: candidateMatchingResult, // Store the external API result in the 'matchingResult' field
        createdAt: new Date(),
      });

      res.json({
        message: "Files submitted and candidate matching result stored successfully",
        resumeData: savedResume,
        jobDescriptionData: savedJobDescription,
        candidateData: savedCandidate,
        externalApiResponse: candidateMatchingResult,
      });
    } catch (error) {
      console.error("Error while processing files:", error);
      res.status(500).json({ error: "Server error during file submission" });
    }
  }
);


// Start the server
const port = 5001; // Change to any available port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/
