import React, { useEffect, useState } from "react";
import "./students.scss";
import { Badge, Button, Card, Space } from "antd";
import { ref, onValue, remove } from "firebase/database";
import { database } from "../../config/firebase";
import { DeleteOutlined } from "@ant-design/icons";
import { HashLoader } from "react-spinners"; // 👈 Import Loader

const StudentsOnline = () => {
  const [StudentsDataOnline, setStudentsDataOnline] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Loader state
  const randomColor = "#007bff";

  useEffect(() => {
    const teacherRef = ref(database, "studentOnline/");

    const unsubscribe = onValue(teacherRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setStudentsDataOnline(dataArray);
      } else {
        setStudentsDataOnline([]);
      }
      setLoading(false); // 👈 turn off loader after data loads
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  const handleDelete = async (id) => {
    try {
      await remove(ref(database, `studentOnline/${id}`));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="TeachersOnline">
      <h1>Teachers Online Applications</h1>

      {/* 👇 Loader */}
      {loading && (
        <div className="loader-overlay">
          <HashLoader color={randomColor} size={50} speedMultiplier={3} />
        </div>
      )}

      {!loading && StudentsDataOnline.map((data) => (
        <div className="teacher-Apply-request" key={data.id}>
          <Badge.Ribbon text="Request" color="green">
            <Card title={data.StudentName} size="small" className="cardRequest">
              <div className="bothhh">
                <div className="details">
                  <p>NUMBER: <span>{data.PhoneNumber}</span></p>
                  <p>Class: <span>{data.Class}</span></p>
                  <p>Description: <span className='DescriptionDescription'>{data.Description}</span></p>
                </div>

                <div>
                  <Space size="middle" className="middle1">
                    <Button
                      className="middle"
                      title="Delete"
                      type="primary"
                      shape="circle"
                      onClick={() => handleDelete(data.id)}
                    >
                      <DeleteOutlined className="svg" />
                    </Button>
                  </Space>
                </div>
              </div>
            </Card>
          </Badge.Ribbon>
        </div>
      ))}
    </div>
  );
};

export default StudentsOnline;
