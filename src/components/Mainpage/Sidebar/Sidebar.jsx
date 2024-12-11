
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ onComponentChange, activeComponent }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleCandidateFilteringClick = () => {
    if (activeComponent === 'candidateFiltering') {
      navigate('/'); // Redirect back to the main page
      onComponentChange('main'); // Update the active component
    } else {
      navigate('/candidateFiltering'); // Navigate to Candidate Filtering page
      onComponentChange('candidateFiltering'); // Update the active component
    }
  };

  return (
    <div className="sidebar">
      <button onClick={toggleSidebar} className="menu-button">
        <FontAwesomeIcon icon={faBars} className="menu-icon" /> MENU
      </button>

      {isSidebarOpen && (
        <ul className="sidebar-content" style={{ marginLeft: "16px" }}>
          <li
            style={{ listStyle: "none", marginLeft: "10px" }}
            onClick={handleCandidateFilteringClick}
          >
            Candidate Filtering
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
