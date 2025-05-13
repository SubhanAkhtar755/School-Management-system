import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  StockOutlined,
  VideoCameraOutlined,
  FormOutlined,
  DatabaseOutlined,
  FileFilled,
  FundProjectionScreenOutlined,
  EllipsisOutlined,
  PaperClipOutlined,
  DollarOutlined,
  
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
import "./index.scss";
import { signOut, auth } from "../../config/firebase.js";
import HashLoader from "react-spinners/HashLoader";
import StudentsForms from "../Students/studentsForms.jsx";
import StudentsFees from "../Students/studentsFees.jsx";
import StudentsData from "../Students/studentsData.jsx";
import StudentsOnline from "../Students/studentsOnline.jsx";
import TeachersForms from "../Teachers/teachersForms.jsx";
import TeachersData from "../Teachers/teachersData.jsx";
import TeachersOnline from "../Teachers/teachersOnline.jsx";
import Events from "../Events/index.jsx";
import Admin from "../admin/index.jsx";
import StudentByClass from "../Students/StudentByClass.jsx";
import ResultSheet from "../Results/Results.jsx";
import EnterResultPage from "../Results/EnterResultPage.jsx";
import { FaChalkboardUser } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineEventNote } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { FaDollarSign } from "react-icons/fa";
import { AiOutlineForm } from "react-icons/ai";
import { MdOutlineDataSaverOff } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { PiExamFill } from "react-icons/pi";
import { FaWpforms } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
const ProfileFront = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [list, setList] = useState("empty");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className="sider">
        <div className="demo-logo-vertical" />
        <Menu
          className="sider"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["14"]}
          items={[
            {
              key: "1",
              icon: <GrUserAdmin />,
              label: "Admin",
              onClick: () => {
                setList("admin");
              },
            },
            {
              key: "10",
              icon: <MdEventAvailable />,
              label: "Events",
              onClick: () => {
                setList("event");
              },
            },
            {
              icon: <GiTeacher />,
              label: "Teachers",
              children: [
                {
                  label: "Forms",
                  key: "2",
                  icon: <MdOutlineEventNote />,
                  onClick: () => {
                    setList("teachersForms");
                  },
                },
                {
                  label: "Data",
                  key: "3",
                  icon:<MdOutlineDataSaverOff />,
                  onClick: () => {
                    setList("teachersData");
                  },
                },
                {
                  label: "Online",
                  key: "4",
                  icon: <AiOutlineForm />,
                  onClick: () => {
                    setList("teachersOnline");
                  },
                },
              ],
            },
            {
              icon: <PiStudentFill />,
              label: "Students",
              children: [
                {
                  label: "Forms",
                  icon: <MdOutlineEventNote />,
                  key: "5",
                  onClick: () => {
                    setList("studentsForms");
                  },
                },
                {
                  label: "Fees",
                  icon: <FaDollarSign />,
                  key: "6",
                  onClick: () => {
                    setList("studentsFees");
                  },
                },
                {
                  label: "Data",
                  icon:<MdOutlineDataSaverOff />,
                  key: "7",
                  onClick: () => {
                    setList("studentsData");
                  },
                },
                {
                  label: "Online",
                  icon: <AiOutlineForm />,
                  key: "8",
                  onClick: () => {
                    setList("studentsOnline");
                  },
                },
                {
                  label: "Class",
                  icon: <FaChalkboardUser />
                  ,
                  key: "9",
                  onClick: () => {
                    setList("StudentByClass");
                  },
                },
              ],
            },
          
            {
              key: "11",
              icon: <PiExamFill />
              ,
              label: "Results",
              children: [
                {
                  key: "12",
                  icon:<FaSearch />
                  ,
                  label: "Results...",
                  onClick: () => {
                    setList("Results");
                  },
                },
                {
                  key: "13",
                  icon: <FaWpforms />
                  ,
                  label: "ResultForm...",
                  onClick: () => {
                    setList("EnterResultPage");
                  },
                }
              ],
            },
            {
              key: "14",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick: () => {
                console.log("nav 3 clicked");
                signOut(auth)
                  .then(() => {
                    console.log("Sign-out successful.");
                  })
                  .catch((error) => {});
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              display: "flex",
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            overflow: "auto",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <>
            {list === "empty" ? (
              <div>
                <div className="ListBody">Please select a list to view.</div>
                <div>
                  <HashLoader
                    color="#1677ff"
                    cssOverride={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",

                      zIndex: "1000",
                      margin: "0 auto",
                    }}
                    loading
                    size={50}
                    speedMultiplier={3}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            {list === "admin" ? (<div>
              <div className="ListBody">Admin</div>
              <Admin /> 
            </div>)
             : ""}
            {list === "teachersForms" ? (
              <div className="container">
                <div className="ListBody">Teachers Forms</div>
                <TeachersForms />
              </div>
            ) : (
              ""
            )}
            {list === "teachersData" ? (
              <div>
                {" "}
                <div className="ListBody">Teachers Data</div>
                <TeachersData />
              </div>
            ) : (
              ""
            )}
            {list === "teachersOnline" ? (
              <div>
                <div className="ListBody">Teachers Online</div>
                <TeachersOnline />
              </div>
            ) : (
              ""
            )}
            {list === "studentsForms" ? (
              <div>
                {" "}
                <div className="ListBody">Students Forms</div>
                <StudentsForms />
              </div>
            ) : (
              ""
            )}
            {list === "studentsFees" ? (
              <div>
                {" "}
                <div className="ListBody">Students Fees</div>
                <StudentsFees />
              </div>
            ) : (
              ""
            )}
            {list === "studentsData" ? (
              <div>
                {" "}
                <div className="ListBody">Students Data</div>
                <StudentsData />
              </div>
            ) : (
              ""
            )}
            {list === "studentsOnline" ? (
              <div>
                {" "}
                <div className="ListBody">Students Online</div>
                <StudentsOnline />
              </div>
            ) : (
              ""
            )}
             {list === "StudentByClass" ? (
              <div>
                {" "}
                <div className="ListBody">Studen By Class</div>
                <StudentByClass />
              </div>
            ) : (
              ""
            )}
              {list === "event" ? (
              <div className="container">
                <div className="ListBody">Events</div>
                <Events />
              </div>
            ) : (
              ""
            )}
              {list === "Results" ? (
              <div className="container">
                <div className="ListBody">Results</div>
                <ResultSheet />
              </div>
            ) : (
              ""
            )}
              {list === "EnterResultPage" ? (
              <div className="container">
                <div className="ListBody">EnterResultPage</div>
                <EnterResultPage />
              </div>
            ) : (
              ""
            )}
          </>
        </Content>
      </Layout>
    </Layout>
  );
};
export default ProfileFront;
