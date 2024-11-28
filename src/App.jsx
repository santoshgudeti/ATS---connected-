
/*
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const[title,setTitle]=useState("");
  const[file,setFile]=useState("");
  const submitImage=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("title",title);
    formData.append("file",file);
    console.log(title,file)
    const result = await axios.post(
    "http://localhost:5000/upload-files",
      formData,
    {
     headers: {"Content-Type": "multipart/form-data"},
    });
console.log(result);
  };

return (
<div className='App'>
  <form className='formStyle' onSubmit={submitImage}>
    <input type='text'
        className='form-control' 
        placeholder='Title' 
        required
        onChange={(e)=>setTitle(e.target.value)}
        />
    <input type = "file" 
        className='form-control' 
        accept="application/pdf" 
        required
        onChange={(e)=>setFile(e.target.files[0])}
        />
    <button className='btn btn-primary' 
        type="submit">
      Submit
    </button>

  </form>
</div>
);

}
export default App;

*/


import React, { useState } from 'react';
import axios from 'axios';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Mainpage from './components/Mainpage/Mainpage';
import Sidebar from './components/Mainpage/Sidebar/Sidebar';
import CreateJobDescription from './components/JobDescription/Create/CreateJobDescription';
import EditJobDescription from './components/JobDescription/Edit/EditJobDescription';
import CandidateFiltering from './components/CandidateFiltering/CandidateFiltering';

function App() {
  const [activeComponent, setActiveComponent] = useState('main');
  const [resumeData, setResumeData] = useState([]);

  const handleComponentChange = (component) => setActiveComponent(component);
  const handleResumeUpload = (data) => {
    if (data && data.length > 0) {
      setResumeData(data);
    } else {
      console.warn("No data available from resume upload.");
    }
  };  

  return (
    <Router>
      <div className='APPA' style={{ overflowY: 'auto', height: '100vh', background:'linear-gradient(359deg, rgb(20 10 44), rgb(27 107 165'}}>
        <Navbar onComponentChange={handleComponentChange} handleResumeUpload={handleResumeUpload} />
        <Sidebar onComponentChange={handleComponentChange} />

        <div className="main-content">
          {activeComponent === 'candidateFiltering' && <CandidateFiltering data={resumeData} />}
          {activeComponent === 'createJob' && <CreateJobDescription />}
          {activeComponent === 'editJob' && <EditJobDescription />}
          {activeComponent === 'main' && <Mainpage />}
        </div>

        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/job-description/create" element={<CreateJobDescription />} />
          <Route path="/job-description/edit" element={<EditJobDescription />} />
        </Routes>
        <div className='App'>
 
</div>
      </div>
    </Router>
  );
}

export default App; 