// import { useState } from 'react';
// import './CandidateFiltering.css';
// import { canditateData } from '../data/StaticData';

// const CandidateFiltering = () => {
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [filterText, setFilterText] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [candidates, setCandidates] = useState(canditateData);

//   const calculateScore = (candidate) => {
//     const experienceScore = candidate.experience >= 5 ? 100 : candidate.experience >= 2 ? 50 : 0;
//     const skillsScore = ['JavaScript', 'React', 'Node.js']
//       .filter(skill => candidate.skills.includes(skill)).length / 3 * 100;
//     const locationScore = candidate.location === 'New York' ? 100 : 0;
//     const availabilityScore = candidate.availability === 'Immediate' ? 100 : 0;

//     return (experienceScore + skillsScore + locationScore + availabilityScore) / 4;
//   };

//   const candidatesWithScores = candidates.map(candidate => ({
//     ...candidate,
//     score: calculateScore(candidate),
//   }));

//   const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

//   const handleCellEdit = (id, field, value) => {
//     setCandidates(prevCandidates =>
//       prevCandidates.map(candidate =>
//         candidate.id === id ? { ...candidate, [field]: value } : candidate
//       )
//     );
//   };

//   const filteredCandidates = candidatesWithScores.filter(candidate =>
//     candidate.skills.toLowerCase().includes(filterText.toLowerCase()) &&
//     (filterStatus === 'all' || candidate.status.toLowerCase() === filterStatus)
//   );

//   const getResumeFilename = (candidate) => {
//     const fileExtension = candidate.resume.split('.').pop();
//     return `${candidate.name.replace(/\s+/g, '_')}.${fileExtension}`;
//   };

//   return (
//     <div className={`candidate-filtering-container ${isFullScreen ? 'full-screen' : ''}` } >
//       <h2 className="candfil" style={{ textDecoration: "underline" ,color:"black"}} onDoubleClick={toggleFullScreen}>
//         Candidate Filtering
//       </h2>
//       <input
//         type="text"
//         placeholder="Search by skills..."
//         value={filterText}
//         onChange={(e) => setFilterText(e.target.value)}
//         className="filter-input"
//       />

//       <div className="table-container">
//         <table className="candidate-table">
//           <thead>
//             <tr>
//               <th>Rank</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Designation</th>
//               <th>Company Name</th>
//               <th>Experience (Years)</th>
//               <th>Skills Matched</th>
//               <th>Location</th>
//               <th>Availability</th>
//               <th>Score</th>
//               <th>Resume Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCandidates.map((candidate, index) => (
//               <tr key={candidate.id}>
//                 <td>{index + 1}</td>
//                 <td onDoubleClick={() => handleCellEdit(candidate.id, 'name', prompt("Edit Name:", candidate.name))}>
//                   {candidate.name}
//                 </td>
//                 <td onDoubleClick={() => handleCellEdit(candidate.id, 'email', prompt("Edit Email:", candidate.email))}>
//                   {candidate.email}
//                 </td>
//                 <td onDoubleClick={() => handleCellEdit(candidate.id, 'designation', prompt("Edit Designation:", candidate.designation))}>
//                   {candidate.designation}
//                 </td>
//                 <td onDoubleClick={() => handleCellEdit(candidate.id, 'companyName', prompt("Edit Company Name:", candidate.companyName))}>
//                   {candidate.companyName}
//                 </td>
//                 <td onDoubleClick={() => handleCellEdit(candidate.id, 'experience', prompt("Edit Experience:", candidate.experience))}>
//                   {candidate.experience}
//                 </td>
//                 <td onDoubleClick={() => handleCellEdit(candidate.id, 'skills', prompt("Edit Skills:", candidate.skills))}>
//                   {candidate.skills}
//                 </td>
//                 <td onDoubleClick={() => handleCellEdit(candidate.id, 'location', prompt("Edit Location:", candidate.location))}>
//                   {candidate.location}
//                 </td>
//                 <td onDoubleClick={() => handleCellEdit(candidate.id, 'availability', prompt("Edit Availability:", candidate.availability))}>
//                   {candidate.availability}
//                 </td>
//                 <td>

//                 <div className="score-circle">
//   {/* Rotating conic gradient background circle */}
//   <div className="background-circle"></div>

//   <svg width="100" height="100">
//     {/* Background circle (gray) */}
//     <circle
//       cx="50"
//       cy="50"
//       r="40"
//       fill="none"
//       stroke=""
//       strokeWidth="8"
//     />
//     {/* Dynamic progress circle that changes color based on score */}
//     <circle
//       cx="50"
//       cy="50"
//       r="40"
//       fill="none"
//       stroke={candidate.score >= 80 ? 'green' : candidate.score >= 50 ? 'orange' : 'red'}
//       strokeWidth="8"
//       strokeDasharray={`${candidate.score * 2.51} ${251 - candidate.score * 2.51}`}
//       strokeDashoffset="0"
//       transform="rotate(-90 50 50)" /* Start progress from top */
//     />
//   </svg>

//   {/* Display score percentage as text in the center */}
//   <span className="score-text">{candidate.score.toFixed(2)}%</span>
// </div>

//                 </td>
//                 <td>
//                   <div className="resume-actions">
//                   <a href={candidate.resume} target="_blank" rel="noopener noreferrer" className="resume-action-view">View</a><br></br>
//                   <a href={candidate.resume} download={getResumeFilename(candidate)} className="resume-action-download">Download</a>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CandidateFiltering;

// import { useState } from 'react';
// import './CandidateFiltering.css';
// import { canditateData } from '../data/StaticData';
// import { useNavigate } from 'react-router-dom';

// const CandidateFiltering = () => {
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [filterText, setFilterText] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [candidates, setCandidates] = useState(canditateData);
//   const [isMinimized, setIsMinimized] = useState(false); // New state for minimizing the table

//   const navigate = useNavigate();

//   const calculateScore = (candidate) => {
//     const experienceScore = candidate.experience >= 5 ? 100 : candidate.experience >= 2 ? 50 : 0;
//     const skillsScore = ['JavaScript', 'React', 'Node.js']
//       .filter(skill => candidate.skills.includes(skill)).length / 3 * 100;
//     const locationScore = candidate.location === 'New York' ? 100 : 0;
//     const availabilityScore = candidate.availability === 'Immediate' ? 100 : 0;

//     return (experienceScore + skillsScore + locationScore + availabilityScore) / 4;
//   };

//   const candidatesWithScores = candidates.map(candidate => ({
//     ...candidate,
//     score: calculateScore(candidate),
//   }));

//   const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

//   const returnMainPage =()=>{
//     navigate("/");
//   }
//   const handleCellEdit = (id, field, value) => {
//     setCandidates(prevCandidates =>
//       prevCandidates.map(candidate =>
//         candidate.id === id ? { ...candidate, [field]: value } : candidate
//       )
//     );
//   };

//   const filteredCandidates = candidatesWithScores.filter(candidate =>
//     candidate.skills.toLowerCase().includes(filterText.toLowerCase()) &&
//     (filterStatus === 'all' || candidate.status.toLowerCase() === filterStatus)
//   );

//   const getResumeFilename = (candidate) => {
//     const fileExtension = candidate.resume.split('.').pop();
//     return `${candidate.name.replace(/\s+/g, '_')}.${fileExtension}`;
//   };

//   return (
//     <div className={`candidate-filtering-container ${isFullScreen ? 'full-screen' : ''}`}>
//       <h2
//         className="candfil"
//         style={{ textDecoration: "underline", color: "black" }}
//         onDoubleClick={toggleFullScreen}
//       >
//         Candidate Filtering
//       </h2>
//       <button className="minimize-button" onClick={returnMainPage}>
//         {isMinimized ? "Show Table" : "return main page"}
//       </button>
//       {!isMinimized && ( // Conditionally render the table
//         <div className="table-container">
//           <input
//             type="text"
//             placeholder="Search by skills..."
//             value={filterText}
//             onChange={(e) => setFilterText(e.target.value)}
//             className="filter-input"
//           />
//           <table className="candidate-table">
//             <thead>
//               <tr>
//                 <th>Rank</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Designation</th>
//                 <th>Company Name</th>
//                 <th>Experience (Years)</th>
//                 <th>Skills Matched</th>
//                 <th>Location</th>
//                 <th>Availability</th>
//                 <th>Score</th>
//                 <th>Resume Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCandidates.map((candidate, index) => (
//                 <tr key={candidate.id}>
//                   <td>{index + 1}</td>
//                   <td onDoubleClick={() => handleCellEdit(candidate.id, 'name', prompt("Edit Name:", candidate.name))}>
//                     {candidate.name}
//                   </td>
//                   <td onDoubleClick={() => handleCellEdit(candidate.id, 'email', prompt("Edit Email:", candidate.email))}>
//                     {candidate.email}
//                   </td>
//                   <td onDoubleClick={() => handleCellEdit(candidate.id, 'designation', prompt("Edit Designation:", candidate.designation))}>
//                     {candidate.designation}
//                   </td>
//                   <td onDoubleClick={() => handleCellEdit(candidate.id, 'companyName', prompt("Edit Company Name:", candidate.companyName))}>
//                     {candidate.companyName}
//                   </td>
//                   <td onDoubleClick={() => handleCellEdit(candidate.id, 'experience', prompt("Edit Experience:", candidate.experience))}>
//                     {candidate.experience}
//                   </td>
//                   <td onDoubleClick={() => handleCellEdit(candidate.id, 'skills', prompt("Edit Skills:", candidate.skills))}>
//                     {candidate.skills}
//                   </td>
//                   <td onDoubleClick={() => handleCellEdit(candidate.id, 'location', prompt("Edit Location:", candidate.location))}>
//                     {candidate.location}
//                   </td>
//                   <td onDoubleClick={() => handleCellEdit(candidate.id, 'availability', prompt("Edit Availability:", candidate.availability))}>
//                     {candidate.availability}
//                   </td>
//                   <td>
//                     <div className="score-circle">
//                       <div className="background-circle"></div>
//                       <svg width="100" height="100">
//                         <circle cx="50" cy="50" r="40" fill="none" stroke="" strokeWidth="8" />
//                         <circle
//                           cx="50"
//                           cy="50"
//                           r="40"
//                           fill="none"
//                           stroke={candidate.score >= 80 ? 'green' : candidate.score >= 50 ? 'orange' : 'red'}
//                           strokeWidth="8"
//                           strokeDasharray={`${candidate.score * 2.51} ${251 - candidate.score * 2.51}`}
//                           strokeDashoffset="0"
//                           transform="rotate(-90 50 50)"
//                         />
//                       </svg>
//                       <span className="score-text">{candidate.score.toFixed(2)}%</span>
//                     </div>
//                   </td>
//                   <td>
//                     <div className="resume-actions">
//                       <a href={candidate.resume} target="_blank" rel="noopener noreferrer" className="resume-action-view">View</a><br />
//                       <a href={candidate.resume} download={getResumeFilename(candidate)} className="resume-action-download">Download</a>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CandidateFiltering;

// import { useState } from 'react';
// import './CandidateFiltering.css';
// import { canditateData } from '../data/StaticData';
// import { useNavigate } from 'react-router-dom';

// const CandidateFiltering = () => {
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [filterText, setFilterText] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [candidates, setCandidates] = useState(canditateData);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const [experienceFilter, setExperienceFilter] = useState('all');
//   const [scoreFilter, setScoreFilter] = useState('all');
//   const [sortOption, setSortOption] = useState('experience'); // Default sort by experience
//   const navigate = useNavigate();

//   const calculateScore = (candidate) => {
//     const experienceScore = candidate.experience >= 5 ? 100 : candidate.experience >= 2 ? 50 : 0;
//     const skillsScore = ['JavaScript', 'React', 'Node.js']
//       .filter(skill => candidate.skills.includes(skill)).length / 3 * 100;
//     const locationScore = candidate.location === 'New York' ? 100 : 0;
//     const availabilityScore = candidate.availability === 'Immediate' ? 100 : 0;

//     return (experienceScore + skillsScore + locationScore + availabilityScore) / 4;
//   };

//   const candidatesWithScores = candidates.map(candidate => ({
//     ...candidate,
//     score: calculateScore(candidate),
//   }));

//   const filteredCandidates = candidatesWithScores.filter(candidate => {
//     const matchesExperience = experienceFilter === 'all' || candidate.experience >= parseInt(experienceFilter);
//     const matchesScore = scoreFilter === 'all' || (candidate.score >= parseInt(scoreFilter.split('-')[0]) && candidate.score <= parseInt(scoreFilter.split('-')[1]));
//     const matchesSkills = candidate.skills.toLowerCase().includes(filterText.toLowerCase());
//     const matchesStatus = filterStatus === 'all' || candidate.status.toLowerCase() === filterStatus;

//     return matchesExperience && matchesScore && matchesSkills && matchesStatus;
//   });

//   const handleSortChange = (event) => {
//     const sortBy = event.target.value;
//     setSortOption(sortBy);
//     const sortedCandidates = [...filteredCandidates];
//     if (sortBy === 'experience') {
//       sortedCandidates.sort((a, b) => b.experience - a.experience);
//     } else if (sortBy === 'score') {
//       sortedCandidates.sort((a, b) => b.score - a.score);
//     } else {
//       sortedCandidates.sort((a, b) => a.name.localeCompare(b.name));
//     }
//     setCandidates(sortedCandidates);
//   };

//   const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

//   const returnMainPage = () => {
//     navigate('/');
//   };

//   const getResumeFilename = (candidate) => {
//     const fileExtension = candidate.resume.split('.').pop();
//     return `${candidate.name.replace(/\s+/g, '_')}.${fileExtension}`;
//   };

//   return (
//     <div className={`candidate-filtering-container ${isFullScreen ? 'full-screen' : ''}`}>
//       <h2
//         className="candfil"
//         style={{ textDecoration: "underline", color: "black" }}
//         onDoubleClick={toggleFullScreen}
//       >
//         Candidate Filtering
//       </h2>
//       <button className="minimize-button" onClick={returnMainPage}>
//         {isMinimized ? "Show Table" : "Return to Main Page"}
//       </button>

//       {!isMinimized && (
//         <div className="table-container">
//           <div className="filters-container">
//             <div className="filter-group">
//               <label htmlFor="experienceFilter">Experience (min):</label>
//               <select
//                 id="experienceFilter"
//                 value={experienceFilter}
//                 onChange={(e) => setExperienceFilter(e.target.value)}
//                 className="filter-select"
//               >
//                 <option value="all">All</option>
//                 <option value="2">2+ years</option>
//                 <option value="5">5+ years</option>
//               </select>
//             </div>
//             <div className="filter-group">
//               <label htmlFor="scoreFilter">Score:</label>
//               <select
//                 id="scoreFilter"
//                 value={scoreFilter}
//                 onChange={(e) => setScoreFilter(e.target.value)}
//                 className="filter-select"
//               >
//                 <option value="all">All</option>
//                 <option value="0-50">0-50</option>
//                 <option value="51-80">51-80</option>
//                 <option value="81-100">81-100</option>
//               </select>
//             </div>
//             <div className="filter-group">
//               <label htmlFor="skillFilter">Skills:</label>
//               <input
//                 type="text"
//                 placeholder="Search by skills..."
//                 value={filterText}
//                 onChange={(e) => setFilterText(e.target.value)}
//                 className="filter-input"
//               />
//             </div>
//             <div className="filter-group">
//               <label htmlFor="sortBy">Sort By:</label>
//               <select
//                 id="sortBy"
//                 value={sortOption}
//                 onChange={handleSortChange}
//                 className="filter-select"
//               >
//                 <option value="experience">Experience</option>
//                 <option value="score">Score</option>
//                 <option value="name">Name</option>
//               </select>
//             </div>
//           </div>

//           <table className="candidate-table">
//             <thead>
//               <tr>
//                 <th>Rank</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Designation</th>
//                 <th>Company Name</th>
//                 <th>Experience (Years)</th>
//                 <th>Skills Matched</th>
//                 <th>Location</th>
//                 <th>Availability</th>
//                 <th>Score</th>
//                 <th>Resume Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCandidates.map((candidate, index) => (
//                 <tr key={candidate.id}>
//                   <td>{index + 1}</td>
//                   <td>{candidate.name}</td>
//                   <td>{candidate.email}</td>
//                   <td>{candidate.designation}</td>
//                   <td>{candidate.companyName}</td>
//                   <td>{candidate.experience}</td>
//                   <td>{candidate.skills}</td>
//                   <td>{candidate.location}</td>
//                   <td>{candidate.availability}</td>
//                   <td>{candidate.score.toFixed(2)}%</td>
//                   <td>
//                     <a href={candidate.resume} target="_blank" rel="noopener noreferrer">View</a><br />
//                     <a href={candidate.resume} download={getResumeFilename(candidate)}>Download</a>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CandidateFiltering;

import { useState } from "react";
import "./CandidateFiltering.css";
import { canditateData } from "../data/StaticData";
import { useNavigate } from "react-router-dom";

const CandidateFiltering = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [candidates, setCandidates] = useState(canditateData);
  const [isMinimized, setIsMinimized] = useState(false);
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [sortOption, setSortOption] = useState("experience"); // Default sort by experience
  const navigate = useNavigate();

  const calculateScore = (candidate) => {
    const experienceScore =
      candidate.experience >= 5 ? 100 : candidate.experience >= 2 ? 50 : 0;
    const skillsScore =
      (["JavaScript", "React", "Node.js"].filter((skill) =>
        candidate.skills.includes(skill)
      ).length /
        3) *
      100;
    const locationScore = candidate.location === "New York" ? 100 : 0;
    const availabilityScore = candidate.availability === "Immediate" ? 100 : 0;

    return (
      (experienceScore + skillsScore + locationScore + availabilityScore) / 4
    );
  };

  const candidatesWithScores = candidates.map((candidate) => ({
    ...candidate,
    score: calculateScore(candidate),
  }));

  const filteredCandidates = candidatesWithScores.filter((candidate) => {
    const matchesExperience =
      experienceFilter === "all" ||
      candidate.experience >= parseInt(experienceFilter);
    const matchesScore =
      scoreFilter === "all" ||
      (candidate.score >= parseInt(scoreFilter.split("-")[0]) &&
        candidate.score <= parseInt(scoreFilter.split("-")[1]));
    const matchesSkills = candidate.skills
      .toLowerCase()
      .includes(filterText.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || candidate.status.toLowerCase() === filterStatus;

    return matchesExperience && matchesScore && matchesSkills && matchesStatus;
  });

  const handleSortChange = (event) => {
    const sortBy = event.target.value;
    setSortOption(sortBy);
    const sortedCandidates = [...filteredCandidates];
    if (sortBy === "experience") {
      sortedCandidates.sort((a, b) => b.experience - a.experience);
    } else if (sortBy === "score") {
      sortedCandidates.sort((a, b) => b.score - a.score);
    } else {
      sortedCandidates.sort((a, b) => a.name.localeCompare(b.name));
    }
    setCandidates(sortedCandidates);
  };

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  const returnMainPage = () => {
    navigate("/");
  };

  const getResumeFilename = (candidate) => {
    const fileExtension = candidate.resume.split(".").pop();
    return `${candidate.name.replace(/\s+/g, "_")}.${fileExtension}`;
  };

  return (
    <div
      className={`candidate-filtering-container ${
        isFullScreen ? "full-screen" : ""
      }`}
    >
      <h2
        className="candfil"
        style={{ textDecoration: "underline", color: "black" }}
        onDoubleClick={toggleFullScreen}
      >
        Candidate Filtering
      </h2>
      <button className="minimize-button" onClick={returnMainPage}>
        {isMinimized ? "Show Table" : "Return to Main Page"}
      </button>

      {!isMinimized && (
        <div className="table-container">
          <div className="filters-container">
          {/* <div className="filter-group">
              <label htmlFor="skillFilter">Skills:</label>
              <input
                type="text"
                placeholder="Search by skills..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="filter-input"
              />
            </div> */}
            <div
  className="filter-group"
  style={{
    display: "flex",
    alignItems: "center", // Align label and input box vertically
    gap: "10px", // Space between label and input
    width: "100%", // Ensure it takes full width
  }}
>
  <label
    htmlFor="skillFilter"
    style={{
      whiteSpace: "nowrap", // Prevent label from wrapping
      fontWeight: "bold", // Optional: Make label bold
      fontSize: "14px", // Consistent font size
      marginBottom:"25px"
    }}
  >
    Skills:
  </label>
  <input
    type="text"
    placeholder="Search by skills..."
    value={filterText}
    onChange={(e) => setFilterText(e.target.value)}
    style={{
      flex: 1, // Take remaining space for the input field
      padding: "5px", // Padding for input
      borderRadius: "4px", // Rounded corners
      border: "1px solid #ccc", // Border style
      fontSize: "14px", // Consistent font size
      lineHeight: "1.5", // Adjust height for alignment
      marginRight:"20px"
    }}
  />
</div>

            <div className="horizontal-filters">
              
              <div
                className="filter-group"
                style={{
                  display: "flex",
                  alignItems: "center", // Ensures vertical alignment of label and select
                  gap: "10px", // Space between label and dropdown
                }}
              >
                <label
                  htmlFor="experienceFilter"
                  style={{
                    whiteSpace: "nowrap", // Prevent label from wrapping
                    fontWeight: "bold", // Optional: Make label bold
                    fontSize: "14px", // Ensure consistent font size
                    marginBottom: "25px",
                  }}
                >
                  Experience (min):
                </label>
                <select
                  id="experienceFilter"
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                  style={{
                    padding: "5px", // Padding for dropdown
                    borderRadius: "4px", // Rounded corners
                    border: "1px solid #ccc", // Border style
                    fontSize: "14px", // Match font size to label
                    lineHeight: "1.5", // Adjust height for proper alignment
                    width:"150px"
                  }}
                >
                  <option value="all">All</option>
                  <option value="2">2+ years</option>
                  <option value="5">5+ years</option>
                </select>
              </div>

              <div
                className="filter-group"
                style={{
                  display: "flex",
                  alignItems: "center", // Ensures vertical alignment of label and select
                  gap: "10px", // Space between label and dropdown
                }}
              >
                <label
                  htmlFor="scoreFilter"
                  style={{
                    whiteSpace: "nowrap", // Prevent label from wrapping
                    fontWeight: "bold", // Optional: Make label bold
                    fontSize: "14px",
                    marginBottom: "25px", // Ensure consistent font size
                  }}
                >
                  Score:
                </label>
                <select
                  id="scoreFilter"
                  value={scoreFilter}
                  onChange={(e) => setScoreFilter(e.target.value)}
                  style={{
                    padding: "5px", // Padding for dropdown
                    borderRadius: "4px", // Rounded corners
                    border: "1px solid #ccc", // Border style
                    fontSize: "14px", // Match font size to label
                    lineHeight: "1.5", // Adjust height for proper alignment
                    width:"150px"
                  }}
                >
                  <option value="all">All</option>
                  <option value="0-50">0-50</option>
                  <option value="51-80">51-80</option>
                  <option value="81-100">81-100</option>
                </select>
              </div>

             
              <div
                className="filter-group"
                style={{
                  display: "flex",
                  alignItems: "center", // Align label and select box vertically
                  gap: "10px", // Space between label and dropdown
                }}
              >
                <label
                  htmlFor="sortBy"
                  style={{
                    whiteSpace: "nowrap", // Prevent label from wrapping
                    fontWeight: "bold", // Optional: Make label bold
                    fontSize: "14px", // Ensure consistent font size
                    marginBottom:"25px"
                  }}
                >
                  Sort By:
                </label>
                <select
                  id="sortBy"
                  value={sortOption}
                  onChange={handleSortChange}
                  style={{
                    padding: "5px", // Padding for dropdown
                    borderRadius: "4px", // Rounded corners
                    border: "1px solid #ccc", // Border style
                    fontSize: "14px", // Match font size to label
                    lineHeight: "1.5", // Adjust height for proper alignment
                    width:"150px"
                  }}
                >
                  <option value="experience">Experience</option>
                  <option value="score">Score</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

          </div>

          <table className="candidate-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Company Name</th>
                <th>Experience (Years)</th>
                <th>Skills Matched</th>
                <th>Location</th>
                <th>Availability</th>
                <th>Score</th>
                <th>Resume Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate, index) => (
                <tr key={candidate.id}>
                  <td>{index + 1}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.designation}</td>
                  <td>{candidate.companyName}</td>
                  <td>{candidate.experience}</td>
                  <td>{candidate.skills}</td>
                  <td>{candidate.location}</td>
                  <td>{candidate.availability}</td>
                 
                  <td>
                  
                  <div className="score-circle">
    {/* Rotating conic gradient background circle */}
    <div className="background-circle"></div>
  
    <svg width="100" height="100">
      {/* Background circle (gray) */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke=""
        strokeWidth="8"
      />
      {/* Dynamic progress circle that changes color based on score */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke={candidate.score >= 80 ? 'green' : candidate.score >= 50 ? 'orange' : 'red'}
        strokeWidth="8"
        strokeDasharray={`${candidate.score * 2.51} ${251 - candidate.score * 2.51}`}
        strokeDashoffset="0"
        transform="rotate(-90 50 50)" /* Start progress from top */
      />
    </svg>
  
    {/* Display score percentage as text in the center */}
    <span className="score-text">{candidate.score.toFixed(2)}%</span>
  </div>
  </td>
  <td>
                  <div className="resume-actions">
                  <a href={candidate.resume} target="_blank" rel="noopener noreferrer" className="resume-action-view">View</a><br></br>
                  <a href={candidate.resume} download={getResumeFilename(candidate)} className="resume-action-download">Download</a>
                  </div>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CandidateFiltering;
