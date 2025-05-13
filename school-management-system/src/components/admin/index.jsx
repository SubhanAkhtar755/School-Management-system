import React, { useState, useEffect } from "react";
import { Card, Switch, Statistic, Row, Col } from "antd";
import { motion } from "framer-motion";
import { getDatabase, ref, set, get } from "firebase/database";
import "./index.scss";
import HashLoader from "react-spinners/HashLoader";

const Admin = () => {
  const db = getDatabase();
  const [studentApply, setStudentApply] = useState(false);
  const [teacherApply, setTeacherApply] = useState(false);
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [studentResultsCount, setStudentResultsCount] = useState(0);
  const [loading, setLoading] = useState(true); // <-- Loader state

  const randomColor = "#36D7B7";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentRef = ref(db, "settings/studentApply");
        const teacherRef = ref(db, "settings/teacherApply");
        const teachersRef = ref(db, "teacher/");
        const studentsRef = ref(db, "student/");
        const studentResultsRef = ref(db, "results/");

        const studentSnapshot = await get(studentRef);
        const teacherSnapshot = await get(teacherRef);
        const teachersSnapshot = await get(teachersRef);
        const studentsSnapshot = await get(studentsRef);
        const studentResultsSnapshot = await get(studentResultsRef);

        if (studentSnapshot.exists()) setStudentApply(studentSnapshot.val());
        if (teacherSnapshot.exists()) setTeacherApply(teacherSnapshot.val());
        if (teachersSnapshot.exists())
          setTeacherCount(Object.keys(teachersSnapshot.val()).length);
        if (studentsSnapshot.exists())
          setStudentCount(Object.keys(studentsSnapshot.val()).length);
        if (studentResultsSnapshot.exists())
          setStudentResultsCount(
            Object.keys(studentResultsSnapshot.val()).length
          );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Turn off loading once data is fetched
      }
    };
    fetchData();
  }, [db]);

  const handleStudentSwitch = (checked) => {
    setStudentApply(checked);
    set(ref(db, "settings/studentApply"), checked);
  };

  const handleTeacherSwitch = (checked) => {
    setTeacherApply(checked);
    set(ref(db, "settings/teacherApply"), checked);
  };

  return (
    <motion.div
      className="admin-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {loading && (
        <div className="loader-overlay">
          <HashLoader color="#1677ff" size={50} speedMultiplier={3} />
        </div>
      )}
      <div className="ListBody1">Admin Panel For All Pages...</div>
      <Row gutter={16} className="admin-stats">
        <Col span={8}>
          <Card className="admin-card" bordered={false}>
            <Statistic
              className="titleee"
              title="Total Students"
              value={studentCount}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="admin-card" bordered={false}>
            <Statistic
              className="titleee"
              title="Total Teachers"
              value={teacherCount}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="admin-card" bordered={false}>
            <Statistic
              className="titleee"
              title="Total Student Results"
              value={studentResultsCount}
            />
          </Card>
        </Col>
      </Row>

      <div className="admin-controls">
      <Card className="admin-card" bordered={false}>
        <h3 className="card-title">Front Page Forms Control</h3>

        <div className="switch-group">
          <span className="switch-label">Enable Student Apply Form</span>
          <Switch
           style={{ width: '60px' , marginLeft: '10px' }} 
            size="large"
            checked={studentApply}
            onChange={handleStudentSwitch}
            className="custom-switch student-switch"
          />
        </div>

        <div className="switch-group">
          <span className="switch-label">Enable Teacher Apply Form</span>
          <Switch
           style={{ width: '60px', marginLeft: '10px'}} 
            size="large"
            checked={teacherApply}
            onChange={handleTeacherSwitch}
            className="custom-switch teacher-switch"
          />
        </div>
      </Card>
    </div>
    </motion.div>
  );
};

export default Admin;
