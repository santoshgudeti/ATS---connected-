import React from 'react';
import './ResponseTable.css';

function ResponseTable({ responseData }) {
  if (!responseData || responseData.length === 0) {
    return <p>No data available to display. Please upload resumes.</p>;
  }

  return (
    <div className="response-table">
      <h2>API Response Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Skills</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {responseData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.skills ? item.skills.join(', ') : 'N/A'}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResponseTable;
