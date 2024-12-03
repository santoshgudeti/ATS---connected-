
import React, { useRef, useState } from "react";
import SMlogo from "../../assets/SMlogo.png";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaCog,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import "./Navbar.css";
import axios from "axios";

const Navbar = () => {
  const fileInputRef = useRef(null);
  const jobFileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedJobFiles, setSelectedJobFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleJobFileSelect = (event) => {
    setSelectedJobFiles(Array.from(event.target.files));
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleJobUploadClick = () => {
    jobFileInputRef.current.click();
  };

  const handleSubmitFiles = async () => {
    if (selectedFiles.length === 0 || selectedJobFiles.length === 0) {
      console.warn("No files selected for submission.");
      return;
    }
  
    setLoading(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("resume", file));
      selectedJobFiles.forEach((file) => formData.append("job_description", file));
  
      const response = await axios.post("http://localhost:5001/api/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      // Log the full API response to inspect its structure
      console.log("Full API Response:", response.data);
  
      if (response.data && response.data.externalApiResponse) {
        // Check if externalApiResponse is present
        const matchingResult = response.data.externalApiResponse;
        console.log("Matching Result from API:", matchingResult);
  
        if (matchingResult && matchingResult["POST Response"]) {
          const postData = matchingResult["POST Response"];
          setResponseData(postData); // Set the POST Response data
        } else {
          console.error("POST Response missing in the external API response.");
          setResponseData(null);
        }
      } else {
        console.error("API response structure is incorrect or missing externalApiResponse.");
        setResponseData(null);
      }
    } catch (error) {
      console.error("File submission failed:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  // Render the API response data
  const renderResponseData = () => {
    if (!responseData) {
      return <p>No response data available.</p>;
    }

    return (
      <div className="response-data">
        <h3>API Response:</h3>
        <ul>
          <li><strong>Name:</strong> {responseData.name}</li>
          <li><strong>Email:</strong> {responseData.email}</li>
          <li><strong>Mobile Number:</strong> {responseData.mobile_number}</li>
          <li><strong>Matching Percentage:</strong> {responseData["Matching Percentage"]}%</li>
          <li><strong>Experience:</strong> {responseData.experience ? responseData.experience.join(", ") : "N/A"}</li>
          <li><strong>Degree:</strong> {responseData.degree ? responseData.degree.join(", ") : "N/A"}</li>
          <li><strong>Designation:</strong> {responseData.designation ? responseData.designation.join(", ") : "N/A"}</li>
          <li><strong>Skills:</strong> {responseData.skills ? responseData.skills.join(", ") : "N/A"}</li>
          <li><strong>Total Experience:</strong> {responseData.total_experience} years</li>
          <li><strong>File URL:</strong> <a href={responseData.file_url} target="_blank" rel="noopener noreferrer">View Resume</a></li>
        </ul>
      </div>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <img
          src={SMlogo}
          alt="Logo"
          className="navbar-logo"
          style={{
            height: "70px",
            width: "70px",
            marginRight: "30px",
            borderRadius: "50%",
          }}
        />
        <div className="navbar-content-container">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <button className="upload-job-button" onClick={handleJobUploadClick}>
              Upload Job Description
            </button>
            <button
              className="submit-job-button btn btn-primary"
              onClick={handleSubmitFiles}
              disabled={loading}
              style={{ marginLeft: "10px", backgroundColor: "#4CAF50" }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm"></span>
                  Loading...
                </>
              ) : (
                "Submit Job"
              )}
            </button>
            <button className="upload-resume-button" onClick={handleUploadClick}>
              Upload Resumes
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileSelect}
              multiple
              accept=".pdf"
            />
            <input
              type="file"
              ref={jobFileInputRef}
              style={{ display: "none" }}
              onChange={handleJobFileSelect}
              multiple
              accept=".pdf"
            />
          </ul>
        </div>

        {renderResponseData()}

        <div className="profile-container" onClick={toggleProfileMenu}>
          <span className="profile">
            <FaUser style={{ marginRight: "10px" }} />
            Profile
          </span>
          {showProfileMenu && (
            <div className="profile-menu">
              <ul>
                <li>
                  <FaUser /> Name: Ganga
                </li>
                <li>
                  <FaEnvelope /> Email: ganga@example.com
                </li>
                <li>
                  <FaPhone /> Contact: +1234567890
                </li>
                <li>
                  <FaBuilding /> Company: Example Inc.
                </li>
                <li>
                  <FaCog /> Settings
                </li>
                <li>
                  <FaSignOutAlt /> Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
 