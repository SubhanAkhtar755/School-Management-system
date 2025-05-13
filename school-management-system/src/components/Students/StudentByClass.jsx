import React, { useEffect, useState } from "react";
import { ref, get, database } from "../../config/firebase";
import { Card, Avatar } from "antd";
import "./students.scss";
import { HashLoader } from "react-spinners"; // 🌀 Loader

const StudentByClass = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("Selected Class");
  const [classList, setClassList] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true); // ⏳ Loader state
  const randomColor = "#007bff";

  useEffect(() => {
    get(ref(database, "student/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setAllStudents(dataArray);

          const classes = [
            ...new Set(dataArray.map((student) => student.Class)),
          ];
          setClassList(classes);
        }
        setLoading(false); // ✅ Turn off loader when data is loaded
      })
      .catch((err) => {
        console.error("Error loading students:", err);
        setLoading(false); // ✅ Also hide loader on error
      });
  }, []);

  useEffect(() => {
    const filtered = allStudents.filter(
      (student) => student.Class === selectedClass
    );
    setFilteredStudents(filtered);
  }, [allStudents, selectedClass]);

  return (
    <div className="StudentByClass">
      {/* 🔄 Loader */}
      {loading && (
        <div className="loader-overlay">
          <HashLoader color={randomColor} size={50} speedMultiplier={3} />
        </div>
      )}

      <h2>Search Students by Class</h2>

      {selectedClass && (
        <Card className="summary-card">
          <h3>Class: {selectedClass}</h3>
          <p>Total Students: {filteredStudents.length}</p>
        </Card>
      )}

      <div className="dropdown-section">
        <label>Select Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">--Select Class--</option>
          {classList.map((cls, index) => (
            <option key={index} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      <div className="students-list">
        <h3>Students in {selectedClass}</h3>
        {filteredStudents.length > 0 ? (
          <div className="student-cards">
            {filteredStudents.map((student) => (
              <Card
                key={student.id}
                className="student-card"
                cover={
                  <img
                    alt="Student"
                    src={student.URL || "https://via.placeholder.com/150"}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                }
              >
                <Card.Meta
                  avatar={
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                  }
                  title={student.UserName}
                  description={`Roll No: ${student.rollNo} | Class: ${student.Class}`}
                />
              </Card>
            ))}
          </div>
        ) : (
          !loading && <p className="NoStudent">No students found for selected class</p>
        )}
      </div>
    </div>
  );
};

export default StudentByClass;
