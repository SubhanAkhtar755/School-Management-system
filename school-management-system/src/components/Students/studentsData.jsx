
import React, { useEffect, useState } from "react";
import "./students.scss";
import "../Teachers/teachers.scss";
import { Avatar, Card, Modal } from "antd";
import { HashLoader } from "react-spinners"; // 👈 Import loader
import { ref, remove, get, database } from "../../config/firebase"; // Update import for remove

const { Meta } = Card;

const StudentsData = () => {
  const [studentData, setStudentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // 👈 Loader state
  const [deletingStudent, setDeletingStudent] = useState(null); // State to track the student to be deleted
  const randomColor = "#007bff"; // or any color

  useEffect(() => {
    get(ref(database, "student/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setStudentData(dataArray);
        } else {
          setStudentData([]);
        }
        setLoading(false); // 👈 Hide loader after fetch
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
        setLoading(false); // 👈 Still hide loader on error
      });
  }, []);

  const filteredData = studentData.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.UserName.toLowerCase().includes(query) ||
      student.rollNo.toLowerCase().includes(query)
    );
  });

  // Function to delete the student from Firebase
  const deleteStudent = (id) => {
    remove(ref(database, `student/${id}`)) // Removing student from database by ID
      .then(() => {
        // After successful deletion, update state to remove the student from UI
        setStudentData((prevData) => prevData.filter((student) => student.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting student: ", error);
      });
  };

  // Show confirmation modal before deleting
  const handleAvatarClick = (student) => {
    setDeletingStudent(student); // Set the student to be deleted
  };

  const handleDeleteConfirmation = () => {
    if (deletingStudent) {
      deleteStudent(deletingStudent.id); // Delete student data
      setDeletingStudent(null); // Close the modal after deletion
    }
  };

  const handleCancelDelete = () => {
    setDeletingStudent(null); // Close the modal without deleting
  };

  return (
    <div className="StudentsData">
      {/* 👇 Loader */}
      {loading && (
        <div className="loader-overlay">
          <HashLoader color={randomColor} size={50} speedMultiplier={3} />
        </div>
      )}

      <p className="displayed">This is where students data will be displayed</p>

      {/* search bar */}
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search by name or roll number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button">Search</button>
      </div>

      {/* student cards */}
      <div className="teacher-card">
        {filteredData.map((data, i) => (
          <Card
            key={i}
            style={{ width: "30%", margin: "10px" }}
            cover={<img alt="example" src={data.URL} style={{ height: "240px" }} />}
            actions={[<p className="Address">{`Address:${data.Address}`}</p>]}
          >
          <Meta
  avatar={
    <Avatar
      src={
        data.Gender === "Male"
          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvfwQVk3s6buEu5beBhG3bsJ_4Ay-oouF26fGnus9tfvp-no2vPBnQVlY&s"
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhIA3SOI5nnFT4HZgU8ViXWguuWqTdndM20mz2eIrNG7b7efCv8FcweEM&s"
      }
      onClick={() => handleAvatarClick(data)} // Handle avatar click
      style={{ cursor: 'pointer' }} // Adding pointer cursor for better UX
    />
  }
  title={data.UserName}
  description={`RollNumber:${data.rollNo}`}
/>
            <div className="details1">
              <div>
                <p>CNIC: <span>{data.CNICUser}</span></p>
                <p>NUMBER: <span>{data.PhoneUser}</span></p>
                <p>DateOfBirth: <span>{data.DateOfBirth}</span></p>
                <p>Class: <span>{data.Class}</span></p>
                <p>Gender: <span>{data.Gender}</span></p>
                
                <p>FatherName: <span>{data.FatherName}</span></p>
                <p>FatherCNIC: <span>{data.CNICFather}</span></p>
                <p>FatherNumber: <span>{data.Phonefather}</span></p>
               
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
    
      <Modal
  title={<span style={{ color: 'black' }}>Are you sure?</span>} // Title color changed to black
  visible={deletingStudent !== null}
  onOk={handleDeleteConfirmation}
  onCancel={handleCancelDelete}
  okText="Yes, Delete"
  cancelText="Cancel"
  okButtonProps={{
    style: {
      backgroundColor: '#F291A3', // OK button background color
      borderColor: '#F291A3',     // OK button border color
    },
  }}
  cancelButtonProps={{
    style: {
      backgroundColor: '#F291A3', // Cancel button background color
      borderColor: '#F291A3',     // Cancel button border color
    },
  }}
  bodyStyle={{ display: 'flex', justifyContent: 'center' }} // Centering the content
  footer={(
    <div style={{
      display: 'flex',
      justifyContent: 'center', // Center buttons horizontally
      gap: '20px', // Add space between buttons
    }}>
      <button
        onClick={handleCancelDelete}
        className="modal-button"
      >
        Cancel
      </button>
      <button
        onClick={handleDeleteConfirmation}
        className="modal-button"
      >
        Yes, Delete
      </button>
    </div>
  )}
>
  <p style={{ color: 'black' }}>Are you sure you want to delete this student's data?</p>
</Modal>

    </div>
  );
};

export default StudentsData;
