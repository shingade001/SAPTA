// src/App.js
import React, { useState } from 'react';
import Student from './Student';

const students = [
  { id: 1, name: 'Aditya Sharma', grades: [55, 60, 45], attendance: 60 },
  { id: 2, name: 'Sham Varma', grades: [75, 70, 65], attendance: 75 },
  { id: 3, name: 'Diya Rana', grades: [85, 90, 75], attendance: 90 },
  { id: 4, name: 'Avantika Rane', grades: [66, 50, 45], attendance: 55 },
  { id: 5, name: 'Jay Shaha', grades: [85, 90, 75], attendance: 90 },
  { id: 6, name: 'Meera Shinde', grades: [50, 40, 55], attendance: 75 },
  { id: 7, name: 'Neha Sane', grades: [95, 90, 85], attendance: 90 },
  { id: 8, name: 'Vikram Bhat', grades: [90, 80, 85], attendance: 75 },
  { id: 9, name: 'Jeevan Deol', grades: [85, 70, 65], attendance: 90 },
  { id: 10, name: 'Jane Kumar', grades: [70, 80, 65], attendance: 75 }
  // Add more student data as needed
];

function App() {
  const [sortBy, setSortBy] = useState({ type: null, order: 'asc' });
  const [filterByProgress, setFilterByProgress] = useState(null);

  const handleSortChange = (e) => {
    const selectedSortType = e.target.value;
    setSortBy((prevSortBy) => ({
      type: selectedSortType,
      order: prevSortBy.type === selectedSortType ? (prevSortBy.order === 'asc' ? 'desc' : 'asc') : 'asc',
    }));
  };

  const handleFilterChange = (e) => {
    setFilterByProgress(e.target.value);
  };

  let filteredStudents = [...students];

  if (filterByProgress) {
    filteredStudents = filteredStudents.filter((student) => {
      const { grades, attendance } = student;
      const averageGrade = grades.reduce((acc, curr) => acc + curr, 0) / grades.length;
      if (filterByProgress === 'High' && averageGrade >= 80) {
        return true;
      } else if (filterByProgress === 'Moderate' && averageGrade >= 60 && averageGrade < 80) {
        return true;
      } else if (filterByProgress === 'Low' && !(averageGrade >= 60)) {
        return true;
      }
      return false;
    });
  }

  if (sortBy.type) {
    filteredStudents.sort((a, b) => {
      if (sortBy.type === 'grade') {
        const averageGradeA = a.grades.reduce((acc, curr) => acc + curr, 0) / a.grades.length;
        const averageGradeB = b.grades.reduce((acc, curr) => acc + curr, 0) / b.grades.length;
        return sortBy.order === 'asc' ? averageGradeA - averageGradeB : averageGradeB - averageGradeA;
      } else if (sortBy.type === 'attendance') {
        return sortBy.order === 'asc' ? a.attendance - b.attendance : b.attendance - a.attendance;
      } else if (sortBy.type === 'name') {
        return sortBy.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      return 0;
    });
  }

  return (
    <div className="App" style={{ backgroundColor: 'lightblue', fontFamily: 'italic' }}>
      <h1 style={{ fontSize: '36px', color: '#FF5733' }}>🎓 Student Academic Progress Tracker 📊</h1>
      <div>
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" onChange={handleSortChange} style={{ color: 'black' }}>
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="grade">Average Grade</option>
          <option value="attendance">Attendance</option>
        </select>
      </div>
      <div>
        <label htmlFor="filter">Filter By Progress:</label>
        <select id="filter" onChange={handleFilterChange} style={{ color: 'black' }}>
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Moderate">Moderate</option>
          <option value="Low">Low</option>
        </select>
      </div>
      {filteredStudents.map((student) => (
        <Student key={student.id} student={student} />
      ))}
    </div>
  );
}

export default App;