// src/Student.js
import React from 'react';

const Student = ({ student }) => {
  const { name, grades, attendance } = student;

  // Calculate average grade
  const averageGrade = grades.reduce((acc, curr) => acc + curr, 0) / grades.length;

  // Determine progress level based on average grade
  let progressLevel;
  if (averageGrade >= 80) {
    progressLevel = 'High';
  } else if (averageGrade >= 60 && averageGrade < 80) {
    progressLevel = 'Moderate';
  } else {
    progressLevel = 'Low';
  }

  // Define color for progress level
  const progressColor = () => {
    switch (progressLevel) {
      case 'High':
        return 'green';
      case 'Moderate':
        return 'yellow';
      case 'Low':
        return 'red';
      default:
        return 'black';
    }
  };

  // Table cell style for progress level
  const progressCellStyle = {
    color: progressColor(),
    fontWeight: 'bold',
  };

  return (
    <div className="student" style={{ textAlign: 'center' }}>
      <h2>{name}</h2>
      <div style={{ display: 'inline-block', textAlign: 'left' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ border: '3px solid #dddddd', padding: '8px' }}>Average Grade:</td>
              <td style={{ border: '3px solid #dddddd', padding: '8px' }}>{averageGrade.toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ border: '3px solid #dddddd', padding: '8px' }}>Attendance:</td>
              <td style={{ border: '3px solid #dddddd', padding: '8px' }}>{attendance}%</td>
            </tr>
            <tr>
              <td style={{ border: '3px solid #dddddd', padding: '8px' }}>Progress:</td>
              <td style={{ border: '3px solid #dddddd', padding: '8px' }}>
                <span style={progressCellStyle}>{progressLevel}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
