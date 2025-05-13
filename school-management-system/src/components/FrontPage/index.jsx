import React, { useState, useEffect, useRef } from "react";
import "./index.css";

import schoolLogo from "../../assets/images/ann.webp";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Typed from "typed.js";
import { Button, Form, Input, Select, Space, Tooltip, Typography } from "antd";
const { TextArea } = Input;
const { Option } = Select;
import { set, ref, database, onValue, get } from "../../config/firebase";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const destroyAll = () => {
  Modal.destroyAll();
};
const CustomButton = ({ children, onClick, variant }) => {
  return (
    <button onClick={onClick} className={`custom-button ${variant}`}>
      {children}
    </button>
  );
};

const FrontPage = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  useEffect(() => {
    const visitorRef = ref(database, "visitors/count");

    // 🔁 Live update listener
    const unsubscribe = onValue(visitorRef, (snapshot) => {
      const currentCount = snapshot.exists() ? snapshot.val() : 0;
      setVisitorCount(currentCount);
    });

    // ⬆️ Increment only once
    const incrementVisitorCount = async () => {
      const snapshot = await get(visitorRef);
      const currentCount = snapshot.exists() ? snapshot.val() : 0;
      set(visitorRef, currentCount + 1);
    };

    incrementVisitorCount();

    return () => unsubscribe(); // Cleanup on unmount
  }, []);
  useEffect(() => {
    const visitorRef = ref(database, "visitors/count");

    onValue(
      visitorRef,
      (snapshot) => {
        const currentCount = snapshot.exists() ? snapshot.val() : 0;
        set(ref(database, "visitors/count"), currentCount + 1);
      },
      {
        onlyOnce: true,
      }
    );
  }, []);
  const [modalInfo, setModalInfo] = useState({ visible: false, message: "" });
  const [form] = Form.useForm();
  const [teacherApplyEnabled, setTeacherApplyEnabled] = useState(false);
  const [studentApplyEnabled, setStudentApplyEnabled] = useState(false);
  useEffect(() => {
    const teacherApplyRef = ref(database, "settings/teacherApply");
    const studentApplyRef = ref(database, "settings/studentApply");

    const unsub1 = onValue(teacherApplyRef, (snapshot) => {
      if (snapshot.exists()) {
        setTeacherApplyEnabled(snapshot.val());
      }
    });

    const unsub2 = onValue(studentApplyRef, (snapshot) => {
      if (snapshot.exists()) {
        setStudentApplyEnabled(snapshot.val());
      }
    });

    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  const onFinish1 = (values) => {
    console.log("Received values of form: ", values);
    set(ref(database, "teacherOnline/" + values.TeacherName), {
      TeacherName: values.TeacherName,
      PhoneNumber: values.PhoneNumber,
      Subject: values.Subject,
      Description: values.Description,
    })
      .then(() => {
        console.log("Document successfully Submit TeacherOnline!");
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });
    form.resetFields();
  };
  const onFinish2 = (values) => {
    set(ref(database, "studentOnline/" + values.StudentName), {
      StudentName: values.StudentName,
      PhoneNumber: values.PhoneNumber,
      Class: values.Class,
      Description: values.Description,
    })
      .then(() => {
        console.log("Document successfully Submit TeacherOnline!", values);
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });
    form.resetFields();
  };
  const [message, setMessage] = useState("Empowering Future Leaders");
  const [isTeacherFormOpen, setTeacherFormOpen] = useState(false);
  const [isStudentFormOpen, setStudentFormOpen] = useState(false);

  const typedBio = useRef(null);
  useEffect(() => {
    const options = {
      strings: [
        `Welcome to the Best School in Hasilpur: Where Excellence Meets Education!`,
      ],
      typeSpeed: 30,
      backSpeed: 0,
      loop: true,
      showCursor: true,
    };

    const typed = new Typed(typedBio.current, options);

    return () => {
      typed.destroy();
    };
  }, []);
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const teacherRef = ref(database, "event/");

    // Real-time Firebase listener
    const unsubscribe = onValue(teacherRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setEvent(dataArray);
      } else {
        setEvent([]);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    // Detect Ctrl + Shift key press
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey) {
        navigate("/login"); // Navigate to /login page
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate]);
  return (
    <div className="school-container">
  <Modal
  title="Application Closed"
  open={modalInfo.visible}
  onCancel={() => setModalInfo({ ...modalInfo, visible: false })}
  centered
  footer={
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
      <Button
        type="primary"
        onClick={() => setModalInfo({ ...modalInfo, visible: false })}
      >
        Cancel
      </Button>
      <Button
        type="primary"
        onClick={() => setModalInfo({ ...modalInfo, visible: false })}
      >
        OK
      </Button>
    </div>
  }
>
  <p style={{ color: "black" }}>{modalInfo.message}</p>
</Modal>

      {/* navbar section ma numbers address link directly no title */}
      <nav className="navbar">
        <div className="fuether">
          <img className="logo" src={schoolLogo} alt="logo" />
          <div className="number">
            <p>+92 334 9771008</p>
          </div>
          <div className="addrees">
            <p>Tameer-e-Nau Public School, Canal View Road Hasilpur</p>
          </div>
        </div>

        <div className="links">
          <a href="#about">
            <FaFacebookF />
          </a>
          <a href="#contact">
            <FaInstagram />
          </a>
          <button
            className="btnbtnbtn"
            onClick={() => {
              navigate("/ResultSheet");
            }}
          >
            Result
          </button>
        </div>
      </nav>

      <header className="header-section">
        <div className="overlay">
          <h1 className="header-title1">
            <span className="header-title1" ref={typedBio}></span>
          </h1>
          <h1 className="header-title">{message}</h1>
          {/* 👇 Visitor count */}
          <div className="visitor-counter">👁️ Visitors: {visitorCount}</div>
          <div className="button-group">
            <CustomButton
              variant="primary"
              onClick={() => {
                if (teacherApplyEnabled) {
                  setTeacherFormOpen(true);
                } else {
                  setModalInfo({
                    visible: true,
                    message:
                      "Teacher job applications are currently closed. Please check back later.",
                  });
                }
              }}
            >
              Teacher Apply
            </CustomButton>

            <CustomButton
              variant="primary"
              onClick={() => {
                if (studentApplyEnabled) {
                  setStudentFormOpen(true);
                } else {
                  setModalInfo({
                    visible: true,
                    message:
                      "Student admissions are currently closed. Please check back soon!",
                  });
                }
              }}
            >
              Student Apply
            </CustomButton>
          </div>
        </div>
      </header>

      {isTeacherFormOpen && (
        <div className="popup-form">
          <div className="form-container">
            <h2>Apply as a Teacher</h2>
            <Form
              layout="vertical"
              name="complex-form1"
              onFinish={onFinish1}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              form={form}
            >
              <Form.Item
                layout="vertical"
                label="TeacherName"
                name={"TeacherName"}
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                placeholder="Teacher Name"
              >
                <Input placeholder="Enter Name" />
              </Form.Item>
              <Form.Item
                layout="vertical"
                label="Phone Number"
                name="PhoneNumber"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input placeholder="0311-111-1111" />
              </Form.Item>

              <Form.Item
                label="Subject"
                name="Subject"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                placeholder="Select Subject"
              >
                <Select placeholder="Select A Subject">
                  <Option value="Computer">Computer</Option>
                  <Option value="Chemistery">Chemistery</Option>
                  <Option value="Biology">Biology</Option>
                </Select>
              </Form.Item>

              <Form.Item
                className="Description"
                label="Description"
                name="Description"
                rules={[{ required: true }]}
              >
                <TextArea
                  rows={4}
                  cols={50}
                  placeholder="Write Full Details..."
                />
              </Form.Item>

              <Form.Item label={null} className="buttonsC">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button
                  type="primary"
                  onClick={() => setTeacherFormOpen(false)}
                >
                  Close
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}

      {isStudentFormOpen && (
        <div className="popup-form">
          <div className="form-container">
            <h2>Apply as a Student</h2>
            <Form
              layout="vertical"
              name="complex-form2"
              onFinish={onFinish2}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              form={form}
            >
              <Form.Item
                layout="vertical"
                label="StudentName"
                name={"StudentName"}
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                placeholder="Student Name"
              >
                <Input placeholder="Enter Name" />
              </Form.Item>
              <Form.Item
                layout="vertical"
                label="Phone Number"
                name="PhoneNumber"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input placeholder="0311-111-1111" />
              </Form.Item>
              <Form.Item
                layout="vertical"
                label="Class"
                name="Class"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Select placeholder="Select A Class" className="SelectSelect">
                  <Option value="First">1 First</Option>
                  <Option value="Second">2 Second</Option>
                  <Option value="Third">3 Third</Option>
                  <Option value="Fourth">4 Fourth</Option>
                  <Option value="Fifth">5 Fifth</Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="Description"
                label="Description"
                name="Description"
                rules={[{ required: true }]}
              >
                <TextArea
                  rows={4}
                  cols={50}
                  placeholder="Write Full Details..."
                />
              </Form.Item>

              <Form.Item label={null} className="buttonsC">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button
                  type="primary"
                  onClick={() => setStudentFormOpen(false)}
                >
                  Close
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}

      {event.map((data) => (
        <section className="section principal-section" key={data.id}>
          <div className="principal-message">
            <img src={data.URL} alt="Principal" className="principal-image" />
            <div>
              <h2 className="section-title">{data.title}</h2>
              <p className="section-text">{data.description}...</p>
            </div>
          </div>
        </section>
      ))}

      <section className="mission-section">
        <h2 className="section-title">Our Mission</h2>
        <p className="section-text">
          Empowering students through knowledge, creativity, and
          collaboration...
        </p>
      </section>

      <section className="section">
        <h2 className="section-title text-center">Why CHOOSING US?</h2>
        <div className="grid-container">
          <div className="grid-item">
            {" "}
            <h3>Excellence</h3>{" "}
            <p>
              Providing top-notch education with a focus on academic
              achievement.
            </p>{" "}
          </div>
          <div className="grid-item">
            {" "}
            <h3>Innovation</h3>{" "}
            <p>
              Modern teaching methodologies and advanced technology integration.
            </p>{" "}
          </div>
          <div className="grid-item">
            {" "}
            <h3>Collaboration</h3>{" "}
            <p>Encouraging teamwork and cooperative learning among students.</p>{" "}
          </div>
          <div className="grid-item">
            {" "}
            <h3>Student Success</h3>{" "}
            <p>Preparing students to excel in academics, sports, and beyond.</p>{" "}
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Tameer-e-Nau Public School. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default FrontPage;
