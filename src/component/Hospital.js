import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Tabs, Form, Input, Button } from "antd";
import { AccountBookFilled } from "@ant-design/icons";

import { getHospitalProfile, updateProfile } from "../api/hospital";

const { TabPane } = Tabs;

const HospitalPage = () => {
  const history = useHistory();

  const [hospitalData, setHospitalData] = useState({
    email: "",
    HospitalName: "",
    username: "",
    address: "",
    password: "",
    patients_API: "",
    doctor_API: "",
  });

  useEffect(() => {
    getHospitalProfile()
      .then((result) => {
        setHospitalData(result.data.hospitalProfile);
      })
      .catch((err) => console.log(err));
  }, []);

  const onFinishSubmit = (data) => {
    const obj = {
      ...data,
      _id: hospitalData._id,
    };

    updateProfile({ data: obj });
  };

  console.log(hospitalData);

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
              <AccountBookFilled style={{ fontSize: "20px" }} />
              Manage Account
            </span>
          }
          key="1"
        >
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={hospitalData}
            onFinish={onFinishSubmit}
          >
            <div
              style={{
                position: "absolute",
                right: "200px",
                bottom: "100px",
                width: "200px",
              }}
            >
              <Button htmlType="submit">Update</Button>
            </div>
            <Form.Item label="Hospital Name" name="HospitalName">
              <Input type="text" value={hospitalData.HospitalName} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ message: "Please Provide Valid Email", type: "email" }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Username" name="username">
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="password"
              name="password"
              rules={[
                {
                  message: "Please Provide at least a lenght of 6 character",
                  min: 6,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input type="text" />
            </Form.Item>

            <Form.Item label="Doctor API" name="doctor_API">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Patients API" name="patients_API">
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

export default HospitalPage;
