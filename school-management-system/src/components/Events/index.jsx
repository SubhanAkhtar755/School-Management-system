import React from "react";
import { Form, Input, Select, Button } from "antd";
import { motion } from "framer-motion";
import "./index.scss";
const { Option } = Select;
import "../Teachers/teachers.scss";
import {
  set,
  ref,
  database,
  update,
  remove,
  onValue,
} from "../../config/firebase";
const Events = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of event: ", values);
    set(ref(database, "event/" + values.title), {
      title: values.title,
      URL: values.URL,
      description: values.description,
    })
      .then(() => {
        console.log("Document successfully Submit TeacherOnline!");
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });
      form.resetFields();
  };
  const updateT = async () => {
    update(ref(database, "event/" + form.getFieldValue("title")), {
      title: form.getFieldValue("title"),
      URL: form.getFieldValue("URL"),
      description: form.getFieldValue("description"),
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
    remove(ref(database, "event/" + form.getFieldValue("title")))
      .then(() => {
        console.log("Document successfully delete!");
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });
      form.resetFields();
  };
  const ReadT = () => {
    const starCountRef = ref(database, "event/" + form.getFieldValue("title"));
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Document data:", data);
      form.setFieldsValue({
        title: data.title,
        URL: data.URL,
        description: data.description,
      });
    });
  };
  return (
    <motion.div
      className="events-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="ListBody1">
        Create Event And Other Messages for Front Page...
      </div>
      <div className="ok">
        <Form
          layout="vertical"
          onFinish={onFinish}
          className="custom-form"
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          form={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please select a title!" }]}
          >
            <Select placeholder="Select a title">
              <Option value="announcement">Announcement</Option>
              <Option value="event">Event</Option>
              <Option value="reminder">Reminder</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="URL"
            name="URL"
            rules={[{ required: true, message: "Please enter a URL!" }]}
          >
            <Input placeholder="Enter Photo-URL" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description!" }]}
          >
            <Input.TextArea placeholder="Enter description" rows={4} />
          </Form.Item>

          <Form.Item>
            <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
              <Button type="primary" htmlType="submit" className="submit-btn">
                Send Message
              </Button>
            </motion.div>
          </Form.Item>
        </Form>
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
                        <Button type="primary" name="submit1" htmlType="submit" >
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
    </motion.div>
  );
};

export default Events;
