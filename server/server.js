const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');
const bodyParser = require('body-parser');
const { Schema } = mongoose;
const http = require('http');
const { Server } = require('socket.io');

// Initialize Express app
const app = express();
const PORT = 5000;

// Create an HTTP server to support WebSockets
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

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

// Other schemas like ResumeSchema, JobDescriptionSchema, etc.
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

// WebSocket connection handler
io.on('connection', (socket) => {
  console.log('WebSocket client connected.');
  socket.on('disconnect', () => {
    console.log('WebSocket client disconnected.');
  });
});

// Emit event on new ApiResponse creation
const emitApiResponseUpdate = (newResponse) => {
  io.emit('apiResponseUpdated', newResponse);
};

// Endpoint to handle file upload and API calls
app.post('/api/submit', upload.fields([{ name: 'resume' }, { name: 'job_description' }]), async (req, res) => {
  try {
    const { files } = req;

    if (!files || !files.resume || !files.job_description) {
      return res.status(400).json({ error: 'Resumes and job descriptions are required.' });
    }

    const results = [];
    const savedJobDescriptions = {};

    // Save job descriptions first (only once per unique file)
    for (const jobDescription of files.job_description) {
      if (!savedJobDescriptions[jobDescription.originalname]) {
        const savedJobDescription = new JobDescription({
          title: jobDescription.originalname,
          description: jobDescription.buffer,
          filename: jobDescription.originalname,
        });
        await savedJobDescription.save();
        savedJobDescriptions[jobDescription.originalname] = savedJobDescription._id;
      }
    }

    // Process resumes and associate with saved job descriptions
    for (const resume of files.resume) {
      const savedResume = new Resume({
        title: resume.originalname,
        pdf: resume.buffer,
        filename: resume.originalname,
      });
      await savedResume.save();

      for (const jobDescription of files.job_description) {
        const jobDescriptionId = savedJobDescriptions[jobDescription.originalname]; 

        // Check if this combination of resume and job description already exists in ApiResponse
        const existingApiResponse = await ApiResponse.findOne({
          resumeId: savedResume._id,
          jobDescriptionId: jobDescriptionId
        });

        if (existingApiResponse) {
          console.log(`Duplicate found for Resume: ${resume.originalname} and Job Description: ${jobDescription.originalname}. Skipping.`);
          continue; // Skip this combination and move to the next
        }

        const formData = new FormData();
        formData.append('resume', resume.buffer, resume.originalname);
        formData.append('job_description', jobDescription.buffer, jobDescription.originalname);

        try {
          const apiResponse = await axios.post(
            'https://l75o0ebez8.execute-api.ap-south-1.amazonaws.com/candidates',
            formData,
            { headers: formData.getHeaders() }
          );

          const savedResponse = new ApiResponse({
            resumeId: savedResume._id,
            jobDescriptionId: jobDescriptionId,
            matchingResult: apiResponse.data['POST Response'],
          });

          // Check if the matching result is valid before saving
          if (apiResponse.data['POST Response']) {
            await savedResponse.save();
            results.push({
              resume: resume.originalname,
              jobDescription: jobDescription.originalname,
              matchingResult: apiResponse.data['POST Response'],
            });
            emitApiResponseUpdate(savedResponse); // Emit the new response to update clients
          } else {
            console.log(`No matching data for Resume: ${resume.originalname} and Job Description: ${jobDescription.originalname}`);
          }
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



// Endpoint to fetch all API responses
app.get('/api/candidate-filtering', async (req, res) => {
  try {
    const responses = await ApiResponse.find()
      .populate('resumeId', 'title filename')
      .populate('jobDescriptionId', 'title filename')
      .sort({ createdAt: -1 });

    res.status(200).json(responses);
  } catch (error) {
    console.error('Error fetching candidate filtering data:', error.message);
    res.status(500).json({ error: 'Failed to fetch candidate filtering data.' });
  }
});

// Start the server
server.listen(PORT, () => {
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
