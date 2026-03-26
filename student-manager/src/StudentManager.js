import React, { useState } from "react";
import "./StudentManager.css";

function StudentManager() {
  const [students, setStudents] = useState([
    { id: 1, name: "Alice", course: "Computer Science" },
    { id: 2, name: "Bob", course: "Mechanical Engineering" },
    { id: 3, name: "Charlie", course: "Electrical Engineering" },
    { id: 4, name: "David", course: "Civil Engineering" },
    { id: 5, name: "Eva", course: "Information Technology" }
  ]);

  const [newStudent, setNewStudent] = useState({ id: "", name: "", course: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const addStudent = () => {
    if (!newStudent.id || !newStudent.name || !newStudent.course) {
      setError("All fields are required!");
      return;
    }
    if (students.some((s) => s.id === parseInt(newStudent.id))) {
      setError("Duplicate ID not allowed!");
      return;
    }
    setStudents([...students, { ...newStudent, id: parseInt(newStudent.id) }]);
    setNewStudent({ id: "", name: "", course: "" });
    setError("");
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="container">
      <h1>🎓 Student Manager</h1>
      <p className="subtitle">Add, view, and delete students instantly</p>

      <div className="form">
        <input
          type="number"
          name="id"
          placeholder="ID"
          value={newStudent.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newStudent.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={newStudent.course}
          onChange={handleChange}
        />
        <button onClick={addStudent}>➕ Add Student</button>
      </div>

      {error && <p className="error">{error}</p>}

      {students.length === 0 ? (
        <p className="empty">No students available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td>
                  <button className="delete" onClick={() => deleteStudent(student.id)}>
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentManager;