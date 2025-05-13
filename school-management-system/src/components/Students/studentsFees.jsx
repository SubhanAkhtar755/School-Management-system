import React, { useState, useEffect } from "react";
import "./students.scss";
import { push, ref, set, onValue, update } from "firebase/database";
import { database } from "../../config/firebase";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentsFees = () => {
  const [studentName, setStudentName] = useState("");
  const [annualPackage, setAnnualPackage] = useState();
  const [paidFees, setPaidFees] = useState();
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [graphSearchName, setGraphSearchName] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const studentsRef = ref(database, "students");
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentsList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setStudents(studentsList);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const monthlyFee = annualPackage / 12;
    const studentData = {
      name: studentName,
      annualPackage,
      monthlyFee,
      paidFees,
    };

    const found = students.find(
      (s) => s.name.toLowerCase() === studentName.toLowerCase()
    );
    if (found) {
      const studentRef = ref(database, `students/${found.id}`);
      update(studentRef, studentData);
    } else {
      const newStudentRef = push(ref(database, "students"));
      set(newStudentRef, studentData);
    }

    setStudentName("");
    setAnnualPackage(0);
    setPaidFees(0);
    setSelectedStudent(null);
  };

  const displayedStudents = graphSearchName.trim()
    ? students.filter((s) =>
        s.name.toLowerCase().includes(graphSearchName.toLowerCase())
      )
    : students.length > 0
    ? [students[0]]
    : [];
  const handleSearch = () => {
    const found = students.find(
      (s) => s.name.toLowerCase() === searchName.toLowerCase()
    );
    if (found) {
      setSelectedStudent(found);
      setStudentName(found.name);
      setAnnualPackage(found.annualPackage);
      setPaidFees(found.paidFees);
    } else {
      alert("Student not found");
    }
  };
  const chartData = {
    labels: displayedStudents.map((s) => s.name),
    datasets: [
      {
        label: "Monthly Fee",
        data: displayedStudents.map((s) => s.annualPackage / 12),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Annual Package",
        data: displayedStudents.map((s) => s.annualPackage),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Paid Fees",
        data: displayedStudents.map((s) => s.paidFees),
        backgroundColor: "rgba(0, 200, 83, 0.6)",
      },
      {
        label: "Unpaid Fees",
        data: displayedStudents.map((s) => s.annualPackage - s.paidFees),
        backgroundColor: "rgba(255, 82, 82, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Student Fees Overview",
      },
    },
  };

  return (
    <div className="StudentsFees">
      <h1>Student's Fees Forms</h1>
      <div className="StudentSearch">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="StudentsFeesForm">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Annual Package"
            value={annualPackage}
            onChange={(e) => setAnnualPackage(Number(e.target.value))}
            required
          />
          <input
            type="number"
            placeholder="Paid Fees"
            value={paidFees}
            onChange={(e) => setPaidFees(Number(e.target.value))}
            required
          />
          <button type="submit">Save Fees</button>
        </form>
        <div className="GraphSearch">
          <input
            type="text"
            placeholder="Search by Name for Graph"
            value={graphSearchName}
            onChange={(e) => setGraphSearchName(e.target.value)}
          />
        </div>
      </div>

      <div className="StudentsFeesGraph">
        <h2>Fees Graph</h2>
        <div style={{ height: "480px" }}>
          <Bar data={chartData} options={chartOptions} className="bar"  />
        </div>
      </div>

      <div className="StudentsFeesList">
        <h2>Student Records</h2>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.name} - {(student.annualPackage / 12).toFixed(2)}/mo -{" "}
              {student.annualPackage}/yr - {student.paidFees} paid
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentsFees;
