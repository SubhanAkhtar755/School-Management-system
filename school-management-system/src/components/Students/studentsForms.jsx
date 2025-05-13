import React from "react";
import "./students.scss";
import { Button, Checkbox, Form, Input, Select } from "antd";
const { TextArea } = Input;
import { DatePicker, Space } from "antd";
import {
  set,
  ref,
  database,
  update,
  remove,
  onValue,
} from "../../config/firebase";

const StudentsForms = () => {
  const [form] = Form.useForm();
  const Submit = async (values) => {
    console.log("Submit:", values);
    set(ref(database, "student/" + values.RollNumber), {
      rollNo: values.RollNumber,
      UserName: values.UserName,
      FatherName: values.FatherName,
      CNICUser: values.CNICUser,
      CNICFather: values.CNICFather,
      PhoneUser: values.PhoneUser,
      Phonefather: values.Phonefather,
      Class: values.Class,
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
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const updateT = async (values) => {
    console.log("update:");
    update(ref(database, "student/" + form.getFieldValue("RollNumber")), {
      UserName: form.getFieldValue("UserName"),
      FatherName: form.getFieldValue("FatherName"),
      CNICUser: form.getFieldValue("CNICUser"),
      CNICFather: form.getFieldValue("CNICFather"),
      PhoneUser: form.getFieldValue("PhoneUser"),
      Phonefather: form.getFieldValue("Phonefather"),
      Class: form.getFieldValue("Class"),
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
    remove(ref(database, "student/" + form.getFieldValue("RollNumber")))
      .then(() => {
        console.log("Document successfully delete!");
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });
    form.resetFields();
  };
  const ReadT = () => {
    console.log("Read:");
    const starCountRef = ref(
      database,
      "student/" + form.getFieldValue("RollNumber")
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Current student data:", data);
      form.setFieldsValue({
        UserName: data.UserName,
        FatherName: data.FatherName,
        CNICUser: data.CNICUser,
        CNICFather: data.CNICFather,
        PhoneUser: data.PhoneUser,
        Phonefather: data.Phonefather,
        Class: data.Class,
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
              label="RollNumber"
              name="RollNumber"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="RollNumber Start from 1 and so on ..." />
            </Form.Item>
          </div>
        </div>
        <div className="row rowm">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            {" "}
            <Form.Item
              className="formitems"
              layout="vertical"
              label="UserName"
              name="UserName"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Enter Name" />
            </Form.Item>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            <Form.Item
              className="formitems"
              layout="vertical"
              label="FatherName"
              name="FatherName"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Enter Father Name" />
            </Form.Item>
          </div>
        </div>
        <div className="row rowm">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            {" "}
            <Form.Item
              className="formitems"
              layout="vertical"
              label="CNIC"
              name="CNICUser"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="00000-0000000-0" />
            </Form.Item>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            <Form.Item
              className="formitems"
              layout="vertical"
              label="CNIC"
              name="CNICFather"
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
              label="Phone No"
              name="PhoneUser"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="0311-111-1111" />
            </Form.Item>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            <Form.Item
              className="formitems"
              layout="vertical"
              label="Phone No"
              name="Phonefather"
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
              label="DOB"
              name="DateOfBirth"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="mm/dd/yy" />
            </Form.Item>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            {" "}
            <Form.Item
              className="formitems formitems1 "
              layout="vertical"
              label="Address"
              name="Address"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Address" />
            </Form.Item>
          </div>
        </div>
        <div className="row rowm">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            {" "}
            <Form.Item
              className="  Gender"
              layout="vertical"
              label="Class"
              name="Class"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select placeholder="Select A Class">
                <Option value="First">1 First</Option>
                <Option value="Second">2 Second</Option>
                <Option value="Third">3 Third</Option>
                <Option value="Fourth">4 Fourth</Option>
                <Option value="Fifth">5 Fifth</Option>
                <Option value="Sixth">6 Sixth</Option>
                <Option value="Seventh">7 Seventh</Option>
                <Option value="Eighth">8 Eighth</Option>
                <Option value="Ninth">9 Ninth</Option>
                <Option value="Tenth">10 Tenth</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            <Form.Item
              className="  Gender"
              layout="vertical"
              label="Gender"
              name="Gender"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select placeholder="Select A Gender">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="row rowm">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            <Form.Item
              label="Photo URL"
              name="URL"
              className="formitems "
              rules={[{ required: false }]}
            >
              <TextArea
                rows={2}
                cols={44}
                
                placeholder="Photo URL"
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item label={null}>
          {/*html dropdown menu */}
          <div className="body">
            <div className="dropdown">
              <div className="select">
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
                  {" "}
                  <div className="caret"></div>
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
      {/* <button Type="submit" onClick={update}>update</button> */}
    </div>
  );
};

export default StudentsForms;

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
