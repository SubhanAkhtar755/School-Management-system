import React, { useEffect, useState } from "react";
import "./teachers.scss";
import { Badge, Button, Card, Space } from "antd";
import { ref, onValue, remove } from "firebase/database";
import { database } from "../../config/firebase";
import { DeleteOutlined } from "@ant-design/icons";
import { HashLoader } from "react-spinners"; // 👈 Add this

const TeachersOnline = () => {
  const [teacherDataOnline, setTeacherDataOnline] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Loader state
  const randomColor = "#007bff"; // Can be randomized if you like

  useEffect(() => {
    const teacherRef = ref(database, "teacherOnline/");

    const unsubscribe = onValue(teacherRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTeacherDataOnline(dataArray);
      } else {
        setTeacherDataOnline([]);
      }
      setLoading(false); // 👈 Turn off loader after data arrives
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await remove(ref(database, `teacherOnline/${id}`));
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div className="TeachersOnline">
       <h1>Teachers Online Applications</h1>
      {loading && (
        <div className="loader-overlay">
          <HashLoader
            color={randomColor}
            size={50}
            speedMultiplier={3}
          />
        </div>
      )}

     

      {teacherDataOnline.map((data) => (
        <div className="teacher-Apply-request" key={data.id}>
          <Badge.Ribbon text="Request" color="green">
            <Card title={data.TeacherName} size="small" className="cardRequest">
              <div className="bothhh">
                <div className="details">
                  <p>NUMBER: <span>{data.PhoneNumber}</span></p>
                  <p>Subject: <span>{data.Subject}</span></p>
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

export default TeachersOnline;
