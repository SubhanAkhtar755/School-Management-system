import React from "react";
import "./teachers.scss";
import { Button, Checkbox, Form, Input, Select } from "antd";
const { TextArea } = Input;
import {
  set,
  ref,
  database,
  update,
  remove,
  onValue,
} from "../../config/firebase";

const TeachersForms = () => {
  const [form] = Form.useForm();
  const Submit = async (values) => {
    form.resetFields();
    console.log("Submit:", values);
    set(ref(database, "teacher/" + values.TeacherName), {
      TeacherName: values.TeacherName,
      TeacherCNIC: values.TeacherCNIC,
      Email: values.Email,
      PhoneNumber: values.PhoneNumber,
      Qualification: values.Qualification,
      Specification: values.Specification,
      Experience: values.Experience,
      DateOfBirth: values.DateOfBirth,
      Gender: values.Gender,
      Address: values.Address,
      URL: values.URL,
    })
      .then(() => {
        console.log("Document successfully Submit!");
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const updateT = async () => {
    console.log("update:");
    update(ref(database, "teacher/" + form.getFieldValue("TeacherName")), {
      TeacherName: form.getFieldValue("TeacherName"),
      TeacherCNIC: form.getFieldValue("TeacherCNIC"),
      Email: form.getFieldValue("Email"),
      PhoneNumber: form.getFieldValue("PhoneNumber"),
      Qualification: form.getFieldValue("Qualification"),
      Specification: form.getFieldValue("Specification"),
      Experience: form.getFieldValue("Experience"),
      DateOfBirth: form.getFieldValue("DateOfBirth"),
      Gender: form.getFieldValue("Gender"),
      Address: form.getFieldValue("Address"),
      URL: form.getFieldValue("URL"),
    })
      .then(() => {
        console.log("Document successfully update!");
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });
    form.resetFields();
  };
  const DeleteT = async () => {
    console.log("Delete:");
    remove(ref(database, "teacher/" + form.getFieldValue("TeacherName")))
      .then(() => {
        console.log("Document successfully delete!");
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });
    form.resetFields();
  };
  const ReadT = () => {
    console.log("Read");
    const starCountRef = ref(
      database,
      "teacher/" + form.getFieldValue("TeacherName")
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Document data:", data);
      form.setFieldsValue({
        TeacherName: data.TeacherName,
        TeacherCNIC: data.TeacherCNIC,
        Email: data.Email,
        PhoneNumber: data.PhoneNumber,
        Qualification: data.Qualification,
        Specification: data.Specification,
        Experience: data.Experience,
        DateOfBirth: data.DateOfBirth,
        Gender: data.Gender,
        Address: data.Address,
        URL: data.URL,
      });
    });
  };

  return (
    <div className="studentform">
      <div className="ListBody1">
        Fill The Form Carefully And Read The Instructions...
      </div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={Submit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <div className="row rowm">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            {" "}
            <Form.Item
              className="formitems"
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
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            <Form.Item
              className="formitems"
              layout="vertical"
              label="TeacherCNIC"
              name="TeacherCNIC"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="00000-0000000-0" />
            </Form.Item>
          </div>
        </div>
        <div className="row rowm">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            {" "}
            <Form.Item
              className="formitems"
              layout="vertical"
              label="Email"
              name="Email"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Example@gmail.com" />
            </Form.Item>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            <Form.Item
              className="formitems"
              layout="vertical"
              label="Phone Number"
              name="PhoneNumber"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="0311-111-1111" />
            </Form.Item>
          </div>
        </div>
        <div className="row rowm">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            {" "}
            <Form.Item
              className="formitems"
              layout="vertical"
              label="Qualification"
              name="Qualification"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="PHD" />
            </Form.Item>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            <Form.Item
              className="formitems"
              layout="vertical"
              label="Specification"
              name="Specification"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Specification" />
            </Form.Item>
          </div>
        </div>
        <div className="row rowm">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            {" "}
            <Form.Item
              className="formitems"
              layout="vertical"
              label="Experience"
              name="Experience"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Experience 1 Years" />
            </Form.Item>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            {" "}
            <Form.Item
              className="formitems "
              layout="vertical"
              label="Address"
              name="Address"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Address" className="address" />
            </Form.Item>
          </div>
        </div>
        <div className="row rowm">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            {" "}
            <Form.Item
              label="Photo URL"
              name="URL"
              className="formitems"
              rules={[{ required: false }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <TextArea rows={2} cols={48}  placeholder="Photo URL" />
            </Form.Item>
          </div>
        
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            {" "}
            <Form.Item
              className="formitems"
              layout="vertical"
              label="DOB"
              name="DateOfBirth"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="mm/dd/yy" />
            </Form.Item>
          </div>
        </div>
        <div className="row rowm">
        <div className="col-12 col-sm-12 col-md-6 col-lg-5">
           
            <Form.Item
              className="formitems formitems1"
              layout="vertical"
              label="Subject"
              name="Subject"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select placeholder='Select A Subject' >
                <Option value="Computer">Computer</Option>
                <Option value="Biology">Biology</Option>
                <Option value="Science">Science</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            {" "}
            <Form.Item
              className="formitems formitems1"
              layout="vertical"
              label="Gender"
              name="Gender"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select placeholder='Select A Gender' >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </div>
          
        </div>
       
      
        <Form.Item label={null}>
          {/*html dropdown menu */}
          <div className="body">
            <div className="dropdown">
              <div className="select" >
                <span
                  className="selected"
                  onClick={() => {
                    const menu = document.querySelectorAll(".menu");
                    menu.forEach((item) => {
                      item.classList.add("active");
                    });
                  }}
                >
                  Open Then (Submit,Update,Delete And Read)
                </span>
                <div
                  className="caret1"
                  onClick={() => {
                    const menu = document.querySelectorAll(".menu");
                    menu.forEach((item) => {
                      item.classList.remove("active");
                    });
                  }}
                > 
               <div className="caret">

               </div>
                </div>
              </div>
              <ul
                className="menu"
                onClick={() => {
                  const menu = document.querySelectorAll(".menu");
                  menu.forEach((item) => {
                    item.classList.remove("active");
                  });
                }}
              >
                <li>
                  <Button type="primary" name="submit1" htmlType="submit">
                    Submit
                  </Button>
                </li>
                <li>
                  <Button type="primary" name="submit4" onClick={ReadT}>
                    Read
                  </Button>
                </li>
                <li>
                  <Button type="primary" name="submit2" onClick={updateT}>
                    Update
                  </Button>
                </li>

                <li>
                  {" "}
                  <Button type="primary" name="submit3" onClick={DeleteT}>
                    Delete
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          {/*html dropdown menu */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default TeachersForms;

{
  /* <Menu
            
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ backgroundColor: "blue", borderRadius: "5px" }}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Open Then (Read , Update , Delete)",
                children: [
                  {
                    label: "Read",
                    key: "3",
                    icon: <DatabaseOutlined />,
                    onClick: () => {
                      console.log("Data");
                    },
                  },
                  {
                    label: "Update",
                    key: "4",
                    icon: <FileFilled />,
                    onClick:(Update),
                  },
                  {
                    label: "Delete",
                    key: "5",
                    icon: <FileFilled />,
                    onClick: () => {
                      console.log("online");
                    },
                  },
                ],
              },
            ]}
          /> */
}
