"use client";
import { Input, Button, Checkbox, Form, Modal } from "antd";
import React, { useState } from "react";

const logInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleOnClick = () => {
    console.log('Register success')
  }

  const validatePassword = (_ : any, value: any) => {
    // Kiểm tra tồn tại một ký tự đặc biệt
    // if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value)) {
    //   return Promise.reject("Password must contain at least one special character!");
    // }
    // Kiểm tra tồn tại một chữ cái viết hoa
    if (!/[A-Z]+/.test(value)) {
      return Promise.reject("Password must contain at least one capital letter!");
    }
    return Promise.resolve();
  };

  type FieldType = {
    name?: string;
    email?: string;
    password?: string;
    remember?: string;
    confirm?: string;
  };

  return (
    <main>
      <Form
        name="login"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 5 }}
        style={{ width: "100%" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter your name" },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
          hasFeedback
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6 },
            {validator: validatePassword}
          ]}
          hasFeedback
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please input your Confirm password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Confirm Password do not match!")
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 10 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10 }}>
          <Button
            type="primary"
            disabled={email && password && confirmpassword ? false : true}
            htmlType="submit"
            onClick={handleOnClick}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};

export default logInForm;
