
import React, { useEffect, useState } from "react";
import "./teachers.scss";
import "../Students/students.scss";
import { Avatar, Card, Modal } from "antd"; // Import Modal for confirmation
import { ref, database, get, remove } from "../../config/firebase";
import { HashLoader } from "react-spinners"; // Add this import

const { Meta } = Card;

const TeachersData = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // 🔹 loader state
  const [deletingTeacher, setDeletingTeacher] = useState(null); // Store the teacher to delete
  const randomColor = "#007bff"; // Or generate dynamically if you like

  useEffect(() => {
    get(ref(database, "teacher/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setTeacherData(dataArray);
        } else {
          setTeacherData([]);
        }
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      })
      .finally(() => {
        setLoading(false); // 🔹 turn off loader
      });
  }, []);

  const filteredTeachers = teacherData.filter(
    (teacher) =>
      teacher.TeacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.TeacherCNIC.includes(searchTerm)
  );

  const handleDeleteTeacher = (id) => {
    // Open a confirmation modal before deleting
    setDeletingTeacher(id);
  };

  const confirmDelete = () => {
    if (deletingTeacher) {
      // Delete the teacher from the Firebase database
      remove(ref(database, `teacher/${deletingTeacher}`))
        .then(() => {
          setTeacherData(
            teacherData.filter((teacher) => teacher.id !== deletingTeacher)
          );
          setDeletingTeacher(null);
        })
        .catch((error) => {
          console.log("Error deleting data: ", error);
        });
    }
  };

  const cancelDelete = () => {
    setDeletingTeacher(null); // Close the delete confirmation
  };

  return (
    <div className="TeachersData">
      {/* 🔹 Loader Overlay */}
      {loading && (
        <div className="loader-overlay">
          <HashLoader color={randomColor} size={50} speedMultiplier={3} />
        </div>
      )}

      <p className="displayed">This is where teachers data will be displayed</p>

      {/* search bar */}
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search by name or CNIC..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </div>

      {/* teachers Card */}
      <div className="teacher-card">
        {filteredTeachers.map((data, i) => (
          <Card
            key={i}
            style={{ width: "30%", margin: "10px" }}
            cover={
              <img
                alt="example"
                src={data.URL}
                style={{ height: "240px" }}
                className="imgcardhover"
              />
            }
            actions={[<p className="Address">{data.Address}</p>]}
          >
            <Meta
              avatar={
                <Avatar
                  title={data.ID}
                  src={
                    data.Gender === "Male"
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvfwQVk3s6buEu5beBhG3bsJ_4Ay-oouF26fGnus9tfvp-no2vPBnQVlY&s"
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhIA3SOI5nnFT4HZgU8ViXWguuWqTdndM20mz2eIrNG7b7efCv8FcweEM&s"
                  }
                  onClick={() => handleDeleteTeacher(data.id)} // Make Avatar clickable for deletion
                  style={{ cursor: "pointer" }} // Change cursor to pointer
                />
              }
              title={data.TeacherName}
              description={`NUMBER:${data.PhoneNumber}`}
            />
            <div className="details1">
              <div>
                <p>
                  CNIC: <span>{data.TeacherCNIC}</span>
                </p>
                <p title={`${data.Email}`}>
                  EMAIL: <span>{data.Email}</span>
                </p>
                <p>
                  Qualification: <span>{data.Qualification}</span>
                </p>
                <p>
                  Specification: <span>{data.Specification}</span>
                </p>
                <p>
                  Experience: <span>{data.Experience}</span>
                </p>
                <p>
                  DateOfBirth: <span>{data.DateOfBirth}</span>
                </p>
                <p>
                  Gender: <span>{data.Gender}</span>
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Confirmation Modal for Deletion */}
      <Modal
  title={<span style={{ color: 'black' }}>Are you sure?</span>} // Title color changed to black
  visible={deletingTeacher !== null}
  onOk={confirmDelete}
  onCancel={cancelDelete}
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
      <button onClick={cancelDelete} className="modal-button">Cancel</button>
      <button onClick={confirmDelete} className="modal-button">Yes, Delete</button>
    </div>
  )}
>
  <p style={{ color: 'black' }}>Are you sure you want to delete this teacher's data?</p>
</Modal>


    </div>
  );
};

export default TeachersData;
