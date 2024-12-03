
import React, { useState } from 'react';
import axios from 'axios';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Mainpage from './components/Mainpage/Mainpage';
import Sidebar from './components/Mainpage/Sidebar/Sidebar';
//import SubmitForm from './components/SubmitForm/SubmitForm';
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
          
          {activeComponent === 'main' && <Mainpage />}
        </div>

        <Routes>
          <Route path="/" element={<Mainpage />} />
         
        </Routes>
        <div className='App'>
 
</div>
      </div>
    </Router>
  );
}

export default App;    

/*
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Mainpage from "./components/Mainpage/Mainpage";
import Sidebar from "./components/Mainpage/Sidebar/Sidebar";
import CandidateFiltering from "./components/CandidateFiltering/CandidateFiltering";

import "./App.css";

function App() {
  const [activeComponent, setActiveComponent] = useState("main");
  const [resumeData, setResumeData] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);

  const handleComponentChange = (component) => setActiveComponent(component);
  const handleApiResponse = (response) => setApiResponse(response);

  const renderApiResponse = () => {
    if (!apiResponse) return <p>No data available. Upload files to see results.</p>;

    return (
      <div className="response-data">
        <h3>API Response:</h3>
        <ul>
          <li><strong>Name:</strong> {apiResponse.name}</li>
          <li><strong>Email:</strong> {apiResponse.email || "N/A"}</li>
          <li><strong>Mobile Number:</strong> {apiResponse.mobile_number || "N/A"}</li>
          <li><strong>Matching Percentage:</strong> {apiResponse["Matching Percentage"] || 0}%</li>
          <li><strong>Experience:</strong> {apiResponse.experience || "N/A"}</li>
          <li><strong>Degree:</strong> {apiResponse.degree || "N/A"}</li>
          <li><strong>Designation:</strong> {apiResponse.designation || "N/A"}</li>
          <li><strong>Skills:</strong> {apiResponse.skills?.join(", ") || "N/A"}</li>
          <li><strong>Total Experience:</strong> {apiResponse.total_experience || 0} years</li>
          <li>
            <strong>File URL:</strong>{" "}
            <a href={apiResponse.file_url} target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Router>
      <div className="APPA">
        <Navbar onApiResponse={handleApiResponse} />
        <Sidebar onComponentChange={handleComponentChange} />
        <div className="main-content">
          {activeComponent === "main" && <Mainpage />}
          {activeComponent === "candidateFiltering" && <CandidateFiltering data={resumeData} />}
          {renderApiResponse()}
        </div>
        <Routes>
          <Route path="/" element={<Mainpage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
*/