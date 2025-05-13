import React, { useState } from "react";
import { set, get, ref, database } from "../../config/firebase";
import "./results.scss";

const EnterResultPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    rollno: "",
    subjects: [
      { name: "Math", totalMarks: 100, gainedMarks: "", percentage: 0, grade: "", passFail: "" },
      { name: "Science", totalMarks: 100, gainedMarks: "", percentage: 0, grade: "", passFail: "" },
      { name: "English", totalMarks: 100, gainedMarks: "", percentage: 0, grade: "", passFail: "" },
      { name: "History", totalMarks: 100, gainedMarks: "", percentage: 0, grade: "", passFail: "" },
      { name: "Geography", totalMarks: 100, gainedMarks: "", percentage: 0, grade: "", passFail: "" },
    ],
    totalMarks: 500,
    totalObtained: 0,
    totalPercentage: 0,
    grade: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      subjects: updatedSubjects,
    }));
  };

  const calculateResult = () => {
    let totalMarksObtained = 0;
    const updatedSubjects = formData.subjects.map((subject) => {
      const gainedMarks = parseInt(subject.gainedMarks || 0);
      const percentage = (gainedMarks / subject.totalMarks) * 100;
      const grade = getGrade(percentage);
      const passFail = percentage >= 40 ? "Pass" : "Fail";
      totalMarksObtained += gainedMarks;

      return { ...subject, gainedMarks, percentage, grade, passFail };
    });

    const totalPercentage = (totalMarksObtained / formData.totalMarks) * 100;
    setFormData((prevData) => ({
      ...prevData,
      subjects: updatedSubjects,
      totalObtained: totalMarksObtained,
      totalPercentage: totalPercentage,
      grade: getGrade(totalPercentage),
    }));

    return { updatedSubjects, totalMarksObtained, totalPercentage, grade: getGrade(totalPercentage) };
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    return "F";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { updatedSubjects, totalMarksObtained, totalPercentage, grade } = calculateResult();

    const studentRef = ref(database, "results/" + formData.rollno);
    set(studentRef, {
      username: formData.username,
      subjects: updatedSubjects,
      totalMarks: formData.totalMarks,
      totalObtained: totalMarksObtained,
      totalPercentage: totalPercentage,
      grade: grade,
    })
      .then(() => {
        setLoading(false);
        alert("Result Saved/Updated Successfully!");
      })
      .catch((error) => {
        setLoading(false);
        alert("Error saving result. Please try again.");
        console.error("Error saving result:", error);
      });
  };

  const handleUpdateFetch = () => {
    if (!formData.rollno) {
      alert("Please enter a Roll Number first.");
      return;
    }

    setLoading(true);
    const studentRef = ref(database, "results/" + formData.rollno);
    get(studentRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setFormData((prevData) => ({
            ...prevData,
            username: data.username || "",
            subjects: data.subjects || prevData.subjects,
            totalMarks: data.totalMarks || 500,
            totalObtained: data.totalObtained || 0,
            totalPercentage: data.totalPercentage || 0,
            grade: data.grade || "",
          }));
        } else {
          alert("No existing result found for this Roll Number.");
        }
      })
      .catch((error) => {
        alert("Error fetching result. Try again.");
        console.error("Fetch error:", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="result-form-container">
      <div className="result-form-card">
        <h2 className="title">Enter / Update Student Result</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <button
              type="button"
              onClick={handleUpdateFetch}
              className="custom-button primary"
              style={{ marginTop: "10px" }}
            >
              {loading ? "Fetching..." : "Fetch Existing Result"}
            </button>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Enter student name"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="rollno">Roll Number</label>
            <input
              type="text"
              name="rollno"
              id="rollno"
              value={formData.rollno}
              onChange={(e) => setFormData({ ...formData, rollno: e.target.value })}
              placeholder="Enter Student Roll Number"
              required
            />
          </div>

          {formData.subjects.map((subject, index) => (
            <div key={index} className="input-group">
              <label htmlFor={`subject-${subject.name}`}>{subject.name}</label>
              <input
                type="number"
                id={`subject-${subject.name}`}
                name="gainedMarks"
                value={subject.gainedMarks}
                onChange={(e) => handleInputChange(e, index)}
                placeholder={`Marks obtained out of ${subject.totalMarks}`}
                required
                min={0}
                max={subject.totalMarks}
              />
            </div>
          ))}

          <div className="button-container">
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Submit / Update Result"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterResultPage;
