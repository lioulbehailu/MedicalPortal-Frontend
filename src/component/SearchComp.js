import React, { useState } from "react";
import { Input, Form, Button, Select } from "antd";
import { searchPatient } from "../api/doctor";

const { Search } = Input;

const SearchComp = ({ setLoading }) => {
  const [searchForm, setSearchForm] = useState({
    name: "",
    fatherName: "",
    grandFatherName: "",
    age: null,
    gender: "",
  });

  const onSearchSubmit = () => {
    searchPatient({ searchForm });
    setLoading(true);
  };

  const onChange = (evt) => {
    evt.preventDefault();
    setSearchForm({
      ...searchForm,
      [evt.target.name]: evt.target.value,
    });
  };

  const onSelectChange = (e) => {
    setSearchForm({
      ...searchForm,
      gender: e,
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const onReset = () => {
    setLoading(false);
    setSearchForm({
      name: "",
      fatherName: "",
      grandFatherName: "",
      age: null,
      gender: "",
    });
  };

  return (
    <div style={{ width: "600px" }}>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onFinish={onSearchSubmit}
        // form={searchForm}
      >
        {/* Full Name */}
        <Form.Item rules={[{ message: "Please Provide Name", required: true }]}>
          <Input
            onChange={onChange}
            type="text"
            placeholder="First Name"
            name="name"
            value={searchForm.name}
          />
        </Form.Item>

        {/* Father Name */}
        <Form.Item
          rules={[{ message: "Please Provide Fathers Name", required: true }]}
        >
          <Input
            onChange={onChange}
            type="text"
            placeholder="Fathers Name"
            name="fatherName"
            value={searchForm.fatherName}
          />
        </Form.Item>
        {/* Grand Father Name */}
        <Form.Item
          rules={[
            { message: "Please Provide Grand Fathers Name", required: true },
          ]}
        >
          <Input
            onChange={onChange}
            type="text"
            placeholder="Grand Fathers Name"
            name="grandFatherName"
            value={searchForm.grandFatherName}
          />
        </Form.Item>

        {/* Age */}
        <Form.Item rules={[{ message: "Please Provide Age", required: true }]}>
          <Input
            onChange={onChange}
            type="number"
            placeholder="Age"
            name="age"
            value={searchForm.age}
          />
        </Form.Item>
        {/* Gender */}
        <Form.Item
          rules={[{ message: "Please Provide Gender", required: true }]}
        >
          <Select onSelect={onSelectChange}>
            <Select.Option name="age" value="male">
              Male
            </Select.Option>
            <Select.Option name="age" value="female">
              Female
            </Select.Option>
          </Select>
        </Form.Item>

        <div>
          <Button htmlType="submit">Search</Button>

          <Button
            style={{ marginLeft: "10px" }}
            htmlType="reset"
            onClick={onReset}
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SearchComp;
