import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateJobDescription.css'; // Import CSS for styling

const CreateJobDescription = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDepartment: '',
    jobType: '',
    location: '',
    jobDescription: '',
    skills: '',
    experience: ''
  });

  const [departments, setDepartments] = useState([]);
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock API Call for Departments
    const fetchDepartments = async () => {
      setDepartments(['Computer Science', 'Business Administration', 'Mechanical Engineering']);
    };
    fetchDepartments();

    // Mock API Call for Skills
    const fetchSkills = async () => {
      setSkills(['JavaScript', 'Python', 'Java', 'React', 'Node.js']);
    };
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/'); // Redirect after submission
  };

  return (
    <div className="form-container-createjobdescription">
      <h2>Create Job Description</h2>
      <form onSubmit={handleSubmit}>
        <label>Job Title:</label>
        <input 
          type="text" 
          name="jobTitle" 
          value={formData.jobTitle} 
          onChange={handleChange} 
          required 
        />

        <label>Job Department:</label>
        <select 
          name="jobDepartment" 
          value={formData.jobDepartment} 
          onChange={handleChange} 
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </select>
          
        <label>Job Type:</label>
        <select 
          name="jobType" 
          value={formData.jobType} 
          onChange={handleChange} 
          required
        >
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Location:</label>
        <input
          type="text"
          name="location"
          placeholder="Enter location..."
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          style={{ width: '100%', padding: '8px', borderRadius: '20px', margin: '5px 0 20px' }}
        />

        <label>Job Description:</label>
        <textarea
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
          required
          rows="4"
          style={{ width: '100%', padding: '8px', borderRadius: '20px', margin: '5px 0 20px' }}
        />

        <label>Skills:</label>
        <select 
          name="skills" 
          value={formData.skills} 
          onChange={handleChange} 
          required
        >
          <option value="">Select Skills</option>
          {skills.map((skill, index) => (
            <option key={index} value={skill}>{skill}</option>
          ))}
        </select>

        <label>Experience (in years):</label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
          min="0"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateJobDescription;
