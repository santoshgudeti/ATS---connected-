// src/components/JobDescription/JobDescriptionPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const JobDescriptionPage = () => {
  return (
    <div>
      <h2>Job Descriptions</h2>
      <nav>
        <ul>
          <li>
            <Link to="/job-description/create">Create Job Description</Link>
          </li>
          <li>
            <Link to="/job-description/edit">Edit Job Description</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default JobDescriptionPage;
