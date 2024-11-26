import React, { useState } from 'react';
import axios from 'axios';

const ResumeUpload = ({ handleResumeUpload }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    skills: '',
    college: '',
    degree: '',
    experience: ''
  });

  // Handle file change
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form field change
  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('resume', file);
    Object.keys(formData).forEach(key => form.append(key, formData[key]));

    axios.post('http://localhost:5000/api/uploadResume', form)
      .then(response => {
        console.log('Resume uploaded successfully:', response.data);
        handleResumeUpload(response.data);
      })
      .catch(error => {
        console.error('Error uploading resume:', error);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={onFormChange} required />
      <input type="email" name="email" placeholder="Email" onChange={onFormChange} required />
      <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={onFormChange} required />
      <input type="text" name="skills" placeholder="Skills (comma separated)" onChange={onFormChange} required />
      <input type="text" name="college" placeholder="College" onChange={onFormChange} required />
      <input type="text" name="degree" placeholder="Degree" onChange={onFormChange} required />
      <input type="text" name="experience" placeholder="Experience" onChange={onFormChange} required />
      <input type="file" onChange={onFileChange} required />
      <button type="submit">Submit Resume</button>
    </form>
  );
};

export default ResumeUpload;
