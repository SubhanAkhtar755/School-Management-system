import React, { useState, useEffect } from "react";
import { get, ref, database, remove } from "../../config/firebase";
import "./results.scss";
import { HashLoader } from "react-spinners";

const ResultSheet = () => {
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const randomColor = "#007bff";

  const SECRET_CODE = "1234"; // 🔐 change this to your actual secret code

  // Add to useState declarations
  const [showSecretPopup, setShowSecretPopup] = useState(false);
  const [secretInput, setSecretInput] = useState("");

  // Updated handleDelete
  const handleDelete = () => {
    if (secretInput === SECRET_CODE) {
      const studentRef = ref(database, "results/" + searchName);
      remove(studentRef)
        .then(() => {
          alert("Result deleted successfully.");
          setSearchResult(null);
          setSearchName("");
          setSecretInput("");
          setShowSecretPopup(false);
        })
        .catch((error) => {
          alert("Error deleting result.");
          console.error("Delete error:", error);
        });
    } else {
      alert("Incorrect secret code.");
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault(); // prevent browser bookmark behavior
        if (searchResult) {
          setShowSecretPopup(true);
        }
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchResult]);
  const handleSearch = () => {
    if (!searchName.trim()) return;

    setLoading(true); // 🔄 Start loader
    const studentRef = ref(database, "results/" + searchName);
    get(studentRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setSearchResult(snapshot.val());
        } else {
          setSearchResult(null);
          alert("No result found for this student.");
        }
      })
      .catch((error) => {
        console.error("Error fetching result:", error);
      })
      .finally(() => {
        setLoading(false); // ✅ Stop loader
      });
  };

  useEffect(() => {
    if (searchName === "") {
      setSearchResult(null);
    }
  }, [searchName]);

  return (
    <div className="search-result">
      {/* 🔄 Loader Overlay */}
      {loading && (
        <div className="loader-overlay">
          <HashLoader color={randomColor} size={50} speedMultiplier={3} />
        </div>
      )}

      <h2>Search Student Result</h2>
      <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Enter student RollNo to search"
      />
      <button onClick={handleSearch}>Search</button>

      {searchResult && (
        <div className="result-display">
          <h2>Result Sheet for {searchResult.username}</h2>
          <div className="result-table-wrapper">
            <table className="result-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Total Marks</th>
                  <th>Gained Marks</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Pass/Fail</th>
                </tr>
              </thead>
              <tbody>
                {searchResult.subjects.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.name}</td>
                    <td>{subject.totalMarks}</td>
                    <td>{subject.gainedMarks}</td>
                    <td>{subject.percentage.toFixed(2)}%</td>
                    <td>{subject.grade}</td>
                    <td>{subject.passFail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="summary">
            <h3>Summary</h3>
            <p>
              <strong>Total Marks:</strong> {searchResult.totalMarks}
            </p>
            <p>
              <strong>Total Obtained:</strong> {searchResult.totalObtained}
            </p>
            <p>
              <strong>Total Percentage:</strong>{" "}
              {searchResult.totalPercentage.toFixed(2)}%
            </p>
            <p>
              <strong>Grade:</strong> {searchResult.grade}
            </p>
          </div>
        </div>
      )}
      {showSecretPopup && (
        <div className="custom-popup animate">
          <div className="popup-content">
            <h3>Enter Secret Code to Delete</h3>
            <input
              type="password"
              value={secretInput}
              onChange={(e) => setSecretInput(e.target.value)}
              placeholder="Enter Code"
              className="code-input"
            />
            <div className="popup-actions">
              <button className="confirm-btn" onClick={handleDelete}>
                Confirm
              </button>
              <button
                className="close-btn"
                onClick={() => setShowSecretPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultSheet;
