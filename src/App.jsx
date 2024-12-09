import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Mainpage from "./components/Mainpage/Mainpage";
import Sidebar from "./components/Mainpage/Sidebar/Sidebar";
import CandidateFiltering from "./components/CandidateFiltering/CandidateFiltering";
import ResponseDisplay from "./components/Navbar/ResponseDisplay";

function App() {
  const [activeComponent, setActiveComponent] = useState("main");
  const [resumeData, setResumeData] = useState([]); // State to store resume data
  const [responseData, setResponseData] = useState(null); // State to store API response data

  const handleComponentChange = (component) => setActiveComponent(component);
  
  const handleResumeUpload = (data) => {
    if (data && data.length > 0) {
      setResumeData(data);
    } else {
      console.warn("No data available from resume upload.");
    }
  };

  // Update ResponseData based on filtered results or processing
  const updateCandidatesData = (newData) => {
    setResponseData(newData);
  };

  return (
    <Router>
      <div
        className="APPA"
        style={{
          overflowY: "auto",
          height: "100vh",
          background: "linear-gradient(359deg, rgb(20 10 44), rgb(27 107 165))",
        }}
      >
        {/* Navbar component */}
        <Navbar setResponseData={setResponseData} />

        {/* Sidebar component to switch between pages */}
        <Sidebar onComponentChange={handleComponentChange} activeComponent={activeComponent} />

        {/* Main content area */}
        <div className="main-content">
          {/* Conditionally render components based on activeComponent */}
          {activeComponent === "candidateFiltering" && (
            <CandidateFiltering data={resumeData} updateCandidatesData={updateCandidatesData} />
          )}
          {activeComponent === "main" && <Mainpage />}
          {/* Display ResponseDisplay if responseData is available */}
          {responseData && <ResponseDisplay data={responseData} />}
        </div>

        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<Mainpage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
