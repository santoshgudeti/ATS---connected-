import React, { useRef, useState } from 'react';
import SMlogo from '../../assets/SMlogo.png';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaCog, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import './Navbar.css';
import axios from 'axios';

const Navbar = ({ onComponentChange }) => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // New Upload Resume Functionality
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFiles(file); // Capture a single file for upload
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmitFiles = async () => {
    if (!selectedFiles) {
      console.warn("No file selected for submission.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", "Uploaded Resume"); // Example title
      formData.append("file", selectedFiles);

      const result = await axios.post("http://localhost:5000/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("File submission result:", result);
      setSelectedFiles(null); // Clear the selected file after upload
    } catch (error) {
      console.error("File submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <span>
          <img
            style={{
              height: "70px",
              width: "70px",
              marginRight: "30px",
              objectFit: "cover",
              border: "3px solid black",
              borderRadius: "50%",
            }}
            src={SMlogo}
            alt="Logo"
          />
        </span>

        <div className="navbar-content-container">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Job Description Posting
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => onComponentChange('createJob')}
                  >
                    Create Job
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => onComponentChange('editJob')}
                  >
                    Edit Job
                  </a>
                </li>
              </ul>
            </li>

            {/* Updated Upload Resume Button */}
            <button
              className="upload-resume-button"
              onClick={handleUploadClick}
            >
              Upload Resume
            </button>

            {/* Updated Submit Button */}
            <button
              className="submit-resume-button btn btn-primary"
              onClick={handleSubmitFiles}
              style={{
                marginLeft: '10px',
                backgroundColor: '#4CAF50',
                borderColor: '#4CAF50',
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm custom-spinner"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden custom-visually-hidden">Loading...</span>
                </>
              ) : (
                'Submit'
              )}
            </button>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileSelect}
              accept=".pdf"
            />
          </ul>
        </div>

        <div className="profile-container" onClick={toggleProfileMenu}>
          <span
            style={{ color: "black", fontSize: '20px', fontWeight: 'bold' }}
            className="profile d-flex align-items-center thick-underline"
          >
            <FaUser style={{ marginRight: '10px' }} className="profile-icon" />
            Profile
          </span>

          {showProfileMenu && (
            <div className="profile-menu">
              <ul>
                <li><FaUser /> Name: Ganga</li>
                <li><FaEnvelope /> Email: ganga@example.com</li>
                <li><FaPhone /> Contact: +1234567890</li>
                <li><FaBuilding /> Company: Example Inc.</li>
                <li onClick={() => alert('Open Settings')}><FaCog /> Settings</li>
                <li onClick={() => alert('Sign Out')}><FaSignOutAlt /> Sign Out</li>
                <li>Or</li>
                <li onClick={() => alert('Sign in another account')}><FaSignInAlt /> Sign in another account</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
