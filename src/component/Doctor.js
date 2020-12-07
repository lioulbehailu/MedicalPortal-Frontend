import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Tabs, Form, Input, Button } from "antd";
import { AccountBookFilled, SearchOutlined } from "@ant-design/icons";

import { showLoading } from "../helper/loading";
import SearchComp from "./SearchComp";
import { getDocProfile, updateProfile } from "../api/doctor";

const { TabPane } = Tabs;

const DoctorPage = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [docData, setDocData] = useState({
    _id: "",
    fullName: "",
    email: "",
    username: "",
    password: "",
    address: "",
  });

  useEffect(() => {
    getDocProfile()
      .then((res) => {
        setDocData(res.data.docProfile);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(docData);

  const onFinishSubmit = (data) => {
    const obj = {
      ...data,
      _id: docData._id,
    };
    updateProfile(obj);
  };

  return (
    <div style={{ justifyContent: "space-between" }}>
      <Tabs
        type="card"
        defaultActiveKey="1"
        size="smaill"
        centered
        style={{ marginLeft: "10px" }}
      >
        <TabPane
          tab={
            <span>
              <SearchOutlined style={{ fontSize: "20px" }} />
              Search
            </span>
          }
          key="1"
        >
          <div
            style={{
              margin: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SearchComp setLoading={setLoading} />
          </div>
          <div style={{ margin: "auto" }}>
            {loading ? showLoading() : <p>Data</p>}
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <AccountBookFilled style={{ fontSize: "20px" }} />
              Manage Account
            </span>
          }
          key="2"
        >
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={docData}
            onFinish={onFinishSubmit}
          >
            <div
              style={{
                position: "absolute",
                right: "200px",
                bottom: "150px",
                width: "200px",
              }}
            >
              <Button htmlType="submit">Update</Button>
            </div>
            <Form.Item label="Full Name" name="doctorName">
              <Input type="text" />
            </Form.Item>
            <Form.Item
              rules={[{ message: "Please Provide Valid Email", type: "email" }]}
              label="Email"
              name="email"
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Username" name="username">
              <Input type="text" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  message: "Please Provide at least a lenght of 6 character",
                  min: 6,
                },
              ]}
              label="password"
              name="password"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input type="text" />
            </Form.Item>
          </Form>
          <Button
            style={{
              position: "fixed",
              right: "0px",
              top: "0px",
              width: "200px",
              height: "40px",
            }}
            onClick={() => {
              localStorage.removeItem("token");
              history.push("/");
            }}
          >
            Logout
          </Button>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DoctorPage;
