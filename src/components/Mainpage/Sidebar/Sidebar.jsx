// import  { useState } from 'react';
// import './Sidebar.css';

// const Sidebar = ({ onComponentChange }) => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="sidebar">
//       {/* MENU button */}
//       <button onClick={toggleSidebar} className="menu-button">
//         MENU
//       </button>

//       {isSidebarOpen && (
//         <ul className="sidebar-content">
//           <li onClick={() => onComponentChange('candidateFiltering')}>Candidate Filtering</li>
//           {/* Add more items as needed */}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Sidebar;


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Sidebar.css';

// const Sidebar = ({ onComponentChange }) => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   const handleCandidateFilteringClick = () => {
//     navigate('/candidates'); // Redirect to /candidates route
//     onComponentChange('candidateFiltering'); // Optional: call the prop if needed
//   };

//   return (
//     <div className="sidebar">
//       <button onClick={toggleSidebar} className="menu-button">
//         MENU
//       </button>

//       {isSidebarOpen && (
//         <ul className="sidebar-content">
//           <li onClick={handleCandidateFilteringClick}>Candidate Filtering</li>
//           {/* Add more items as needed */}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Sidebar;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ onComponentChange }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleCandidateFilteringClick = () => {
    navigate('/candidateFiltering'); // Redirect to /candidates route
    onComponentChange('candidateFiltering'); // Optional: call the prop if needed
  };

  return (
    <div className="sidebar">
      <button onClick={toggleSidebar} className="menu-button">
        <FontAwesomeIcon icon={faBars} /> {/* Replaces "MENU" with the hamburger icon */}
      </button>

      {isSidebarOpen && (
        <ul className="sidebar-content" style={{ marginLeft:"16px"}}>
          <li style={{listStyle:"none" , marginLeft:"10px"}}onClick={handleCandidateFilteringClick}>Candidate Filtering</li>
          {/* Add more items as needed */}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;


