const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data'); // Import form-data library
const bodyParser = require('body-parser');
const { Schema } = mongoose;

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://santoshgudeti:GUDETIsantosh@cluster0.7wsub.mongodb.net/santosh?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((error) => console.error('MongoDB connection error:', error));
// Define Mongoose Schemas
const ApiResponseSchema = new Schema({
  resumeId: { type: String, required: true },
  jobDescriptionId: { type: String, required: true },
  matchingResult: Object,
  createdAt: { type: Date, default: Date.now },
});
const ApiResponse = mongoose.model('ApiResponse', ApiResponseSchema);
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

// Endpoint to handle file upload and API calls
app.post('/api/submit', upload.fields([{ name: 'resume' }, { name: 'job_description' }]), async (req, res) => {
  try {
    const { files } = req;

    if (!files || !files.resume || !files.job_description) {
      return res.status(400).json({ error: 'Resumes and job descriptions are required.' });
    }

    const results = [];
    const savedJobDescriptions = {}; // Cache for storing already-saved job descriptions

    // Save job descriptions first (only once per unique file)
    for (const jobDescription of files.job_description) {
      if (!savedJobDescriptions[jobDescription.originalname]) {
        const savedJobDescription = new JobDescription({
          title: jobDescription.originalname,
          description: jobDescription.buffer,
          filename: jobDescription.originalname,
        });
        await savedJobDescription.save();
        savedJobDescriptions[jobDescription.originalname] = savedJobDescription._id; // Cache the saved job description ID
      }
    }

    // Process resumes and associate with saved job descriptions
    for (const resume of files.resume) {
      // Save resume to the database
      const savedResume = new Resume({
        title: resume.originalname,
        pdf: resume.buffer,
        filename: resume.originalname,
      });
      await savedResume.save();

      // Use each saved job description to call the external API
      for (const jobDescription of files.job_description) {
        const jobDescriptionId = savedJobDescriptions[jobDescription.originalname]; // Use cached ID

        const formData = new FormData();
        formData.append('resume', resume.buffer, resume.originalname);
        formData.append('job_description', jobDescription.buffer, jobDescription.originalname);

        try {
          const apiResponse = await axios.post(
            'https://l75o0ebez8.execute-api.ap-south-1.amazonaws.com/candidates',
            formData,
            { headers: formData.getHeaders() }
          );

          // Save the API response to the database
          const savedResponse = new ApiResponse({
            resumeId: savedResume._id,
            jobDescriptionId: jobDescriptionId,
            matchingResult: apiResponse.data['POST Response'],
          });
          await savedResponse.save();

          results.push({
            resume: resume.originalname,
            jobDescription: jobDescription.originalname,
            matchingResult: apiResponse.data['POST Response'],
          });
        } catch (error) {
          console.error('Error with external API:', error.message);
        }
      }
    }

    res.status(200).json({ message: 'Files processed and stored successfully.', results });
  } catch (error) {
    console.error('Error processing files:', error.message);
    res.status(500).json({ error: 'Failed to process files.', details: error.message });
  }
});


    
// Endpoint to serve stored files
app.get('/api/files/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    const apiResponse = await ApiResponse.findById(fileId);

    if (!apiResponse) {
      return res.status(404).json({ error: 'File not found' });
    }

    const { file_url } = apiResponse.response['POST Response'];
    if (!file_url) {
      return res.status(404).json({ error: 'File URL not found in API response' });
    }

    const response = await axios.get(file_url, { responseType: 'stream' });
    response.data.pipe(res);
  } catch (error) {
    console.error('Error serving file:', error.message);
    res.status(500).json({ error: 'Failed to fetch file', details: error.message });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




/* 
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data'); // Import form-data library
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
// Define Mongoose Schemas
const ApiResponseSchema = new Schema({
  resumeId: { type: String, required: true },
  jobDescriptionId: { type: String, required: true },
  matchingResult: Object,
  createdAt: { type: Date, default: Date.now },
});
const ApiResponse = mongoose.model('ApiResponse', ApiResponseSchema);
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

// Endpoint to handle file upload and API calls
app.post('/api/submit', upload.fields([{ name: 'resume' }, { name: 'job_description' }]), async (req, res) => {
  try {
    const { files } = req;

    if (!files || !files.resume || !files.job_description) {
      return res.status(400).json({ error: 'Resumes and job descriptions are required.' });
    }

    const results = [];
    for (const resume of files.resume) {
      for (const jobDescription of files.job_description) {
        const formData = new FormData();
        formData.append('resume', resume.buffer, resume.originalname);
        formData.append('job_description', jobDescription.buffer, jobDescription.originalname);

        try {
          const apiResponse = await axios.post(
            'https://l75o0ebez8.execute-api.ap-south-1.amazonaws.com/candidates',
            formData,
            { headers: formData.getHeaders() }
          );

          // Save API response to MongoDB
          const savedResponse = new ApiResponse({
            resumeId: resume.originalname,
            jobDescriptionId: jobDescription.originalname,
            matchingResult: apiResponse.data['POST Response'],
          });
          await savedResponse.save();

          results.push({
            resume: resume.originalname,
            jobDescription: jobDescription.originalname,
            matchingResult: apiResponse.data['POST Response'],
          });
        } catch (error) {
          console.error('Error with external API:', error.message);
        }
      }
    }

    res.status(200).json({ message: 'Files processed successfully.', results });
  } catch (error) {
    console.error('Error processing files:', error.message);
    res.status(500).json({ error: 'Failed to process files.', details: error.message });
  }
});

    
// Endpoint to serve stored files
app.get('/api/files/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    const apiResponse = await ApiResponse.findById(fileId);

    if (!apiResponse) {
      return res.status(404).json({ error: 'File not found' });
    }

    const { file_url } = apiResponse.response['POST Response'];
    if (!file_url) {
      return res.status(404).json({ error: 'File URL not found in API response' });
    }

    const response = await axios.get(file_url, { responseType: 'stream' });
    response.data.pipe(res);
  } catch (error) {
    console.error('Error serving file:', error.message);
    res.status(500).json({ error: 'Failed to fetch file', details: error.message });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


*/
