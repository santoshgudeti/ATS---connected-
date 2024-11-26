import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditJobDescription.css'; // Import CSS for styling

const EditJobDescription = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDepartment: '',
    jobType: '',
    location: '',
    jobDescription: '',
    skills: '',
    experience: ''
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Redirect to home page after submission
    navigate('/');
  };

  return (
    <div className="form-container-editjobdescription">
      <h2>Edit Job Description</h2>
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
        <input
          type="text"
          name="jobDepartment"
          value={formData.jobDepartment}
          onChange={handleChange}
          required
        />

        <label>Job Type:</label>
        <select name="jobType" value={formData.jobType} onChange={handleChange} required>
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Job Description:</label>
        <textarea
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
          required
        />

        <label>Skills:</label>
        <textarea
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          required
        />

        <label>Experience:</label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        <button className="update" type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditJobDescription;
