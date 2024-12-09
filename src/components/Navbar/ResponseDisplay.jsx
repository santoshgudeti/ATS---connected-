import React from "react";
import "./ResponseDisplay.css"; // Add necessary styles here

const ResponseDisplay = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available. Upload files to see the results.</p>;
  }

  // Sort data by Matching Percentage in descending order
  const sortedData = data
    .map((result) => ({
      ...result,
      matchingPercentage: result.matchingResult?.["Matching Percentage"] || 0,
    }))
    .sort((a, b) => b.matchingPercentage - a.matchingPercentage);

  return (
    <div className="table table-hover table-dark">
      <h3>Matching Results:</h3>
      <table className="table table-hover table-dark header">
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
          {sortedData.map((result, index) => {
            const { resume, jobDescription, matchingResult } = result;

            return (
              <tr key={index}>
                {/* Rank based on the index of the sorted data */}
                <td>{index + 1}</td>
                <td>{matchingResult?.name || "N/A"}</td>
                <td>{matchingResult?.email || "N/A"}</td>
                <td>{matchingResult?.total_experience || "0"} years</td>
                <td>{matchingResult?.mobile_number || "N/A"}</td>
                <td>{matchingResult?.skills?.join(", ") || "N/A"}</td>
                <td>{matchingResult?.designation?.join(", ") || "N/A"}</td>
                <td>{matchingResult?.degree || "N/A"}</td>
                <td>{matchingResult?.company_names || "N/A"}</td>
                <td>{matchingResult?.["Matching Percentage"] || "0"}%</td>
                <td>
                  <a
                    href={matchingResult?.file_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResponseDisplay;
/* 
import React from "react";
import "./ResponseDisplay.css"; // Add necessary styles here

const ResponseDisplay = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available. Upload files to see the results.</p>;
  }

  // Sort data by Matching Percentage in descending order
  const sortedData = data
    .map((result) => ({
      ...result,
      matchingPercentage: result.matchingResult?.["Matching Percentage"] || 0,
    }))
    .sort((a, b) => b.matchingPercentage - a.matchingPercentage);

  return (
    <div className="table table-hover table-dark">
      <h3>Matching Results:</h3>
      <table className="table table-hover table-dark header">
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
          {sortedData.map((result, index) => {
            const { resume, matchingResult } = result;

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{matchingResult?.name || "N/A"}</td>
                <td>{matchingResult?.email || "N/A"}</td>
                <td>{matchingResult?.total_experience || "0"} years</td>
                <td>{matchingResult?.mobile_number || "N/A"}</td>
                <td>{matchingResult?.skills?.join(", ") || "N/A"}</td>
                <td>{matchingResult?.designation?.join(", ") || "N/A"}</td>
                <td>{matchingResult?.degree || "N/A"}</td>
                <td>{matchingResult?.company_names || "N/A"}</td>
                <td>{matchingResult?.["Matching Percentage"] || "0"}%</td>
                <td>
                  <a
                    href={matchingResult?.file_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResponseDisplay;

*/
