import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./CandidateFiltering.css";

const CandidateFiltering = () => {
  const [candidates, setCandidates] = useState([]);
  const [expandedLists, setExpandedLists] = useState({}); // State to manage expand/collapse for lists

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("apiResponseUpdated", (newResponse) => {
      setCandidates((prevCandidates) => {
        const exists = prevCandidates.some(
          (candidate) =>
            candidate.resumeId === newResponse.resumeId &&
            candidate.jobDescriptionId === newResponse.jobDescriptionId
        );

        if (exists) {
          console.log("Duplicate record detected and ignored:", newResponse);
          return prevCandidates;
        }

        return [newResponse, ...prevCandidates];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/candidate-filtering");
        const data = await response.json();

        const uniqueCandidates = data.filter((candidate, index, self) => {
          return (
            index ===
            self.findIndex(
              (c) =>
                c.resumeId === candidate.resumeId &&
                c.jobDescriptionId === candidate.jobDescriptionId
            )
          );
        });

        setCandidates(uniqueCandidates);
      } catch (error) {
        console.error("Error fetching candidate data:", error.message);
      }
    };

    fetchCandidates();
  }, []);

  if (!candidates || candidates.length === 0) {
    return <p>No candidates available. Upload files to see results.</p>;
  }

  const sortedCandidates = candidates
    .map((candidate) => ({
      ...candidate,
      matchingPercentage: candidate.matchingResult?.["Matching Percentage"] || 0,
    }))
    .sort((a, b) => b.matchingPercentage - a.matchingPercentage);

  const toggleExpand = (index, type) => {
    setExpandedLists((prev) => ({
      ...prev,
      [`${index}-${type}`]: !prev[`${index}-${type}`],
    }));
  };

  const renderListWithExpand = (items, index, type) => {
    const maxItems = 3;
    const isExpanded = expandedLists[`${index}-${type}`];
    const visibleItems = isExpanded ? items : items.slice(0, maxItems);

    return (
      <>
        <ul className="bullet-list">
          {visibleItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        {items.length > maxItems && (
          <span
            className="toggle-link"
            onClick={() => toggleExpand(index, type)}
          >
            {isExpanded ? "Show Less" : "More..."}
          </span>
        )}
      </>
    );
  };

  return (
    <div
      
      className="table-container CandidateFiltering"
    >
      <h3 className="CF">All Candidates Results</h3>
      <div className="table-responsive cf1">
        <table className="table table-hover table-dark cf2">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Email</th>
              <th>Total Experience</th>
              <th>Mobile Number</th>
              <th>Skills</th>
              <th>Designation</th>
              <th>Degree</th>
              <th>Company Names</th>
              <th>Matching Percentage</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            {sortedCandidates.map((candidate, index) => {
              const { matchingResult } = candidate;

              return (
                <tr key={candidate._id || index}>
                  <td>{index + 1}</td>
                  <td>{matchingResult?.name || "N/A"}</td>
                  <td className="email-column">{matchingResult?.email || "N/A"}</td>
                  <td>{matchingResult?.total_experience || "0"} years</td>
                  <td>{matchingResult?.mobile_number || "N/A"}</td>
                  <td>
                    {matchingResult?.skills?.length
                      ? renderListWithExpand(matchingResult.skills, index, "skills")
                      : "N/A"}
                  </td>
                  <td>
                    {matchingResult?.designation?.length
                      ? renderListWithExpand(matchingResult.designation, index, "designation")
                      : "N/A"}
                  </td>
                  <td>{matchingResult?.degree || "N/A"}</td>
                  <td>{matchingResult?.company_names || "N/A"}</td>
                  <td>{matchingResult?.["Matching Percentage"] || "0"}%</td>
                  <td>
                    <a
                      href={matchingResult?.file_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateFiltering;


/*Tested code 

import { useState, useEffect } from "react";
import "./CandidateFiltering.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CandidateFiltering = ({ updateCandidatesData }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [sortOption, setSortOption] = useState("experience");
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const navigate = useNavigate();

  // Fetch stored API responses from the backend
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/responses");
        console.log("Fetched Responses:", response.data);  // Log the fetched data
        setFilteredCandidates(response.data); // Update state with the fetched data
        updateCandidatesData(response.data); // Update parent component with the fetched data
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };
  
    fetchResponses();
  }, [updateCandidatesData]);
  

  // Handle sorting of the filtered candidates
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
    setFilteredCandidates(sortedCandidates);
    updateCandidatesData(sortedCandidates);
  };

  const returnMainPage = () => {
    navigate("/");
  };

  const getResumeFilename = (candidate) => {
    const resumeField = candidate?.resume || candidate?.matchingResult?.resume; // Check matchingResult too
    
    if (!resumeField) {
      return "No resume available"; // Handle missing resume case
    }
    
    const fileExtension = resumeField.split(".").pop();
    return `${candidate.name.replace(/\s+/g, "_")}.${fileExtension}`;
  };
  
  return (
    <div className={`candidate-filtering-container ${isFullScreen ? "full-screen" : ""}`}>
      <h2
        className="candfil"
        style={{ textDecoration: "underline", color: "black" }}
        onDoubleClick={() => setIsFullScreen(!isFullScreen)}
      >
        Candidate Filtering
      </h2>
      <button className="minimize-button" onClick={returnMainPage}>
        Return to Main Page
      </button>

      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="experienceFilter">Experience (min):</label>
          <select
            id="experienceFilter"
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="2">2+ years</option>
            <option value="5">5+ years</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="scoreFilter">Score:</label>
          <select
            id="scoreFilter"
            value={scoreFilter}
            onChange={(e) => setScoreFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="0-50">0-50</option>
            <option value="51-80">51-80</option>
            <option value="81-100">81-100</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sortBy">Sort By:</label>
          <select id="sortBy" value={sortOption} onChange={handleSortChange}>
            <option value="experience">Experience</option>
            <option value="score">Score</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <table className="candidate-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Email</th>
            <th>Skills</th>
            <th>Experience</th>
            <th>Score</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{candidate.resumeId}</td> 
              <td>{candidate.jobDescriptionId}</td> 
              <td>{candidate.matchingResult.skills}</td> 
              <td>{candidate.matchingResult.experience}</td> 
              <td>{candidate.matchingResult.score}</td>
              <td>
                <a href={candidate.resumeId} target="_blank" rel="noopener noreferrer">
                 {getResumeFilename(candidate)}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateFiltering; */


