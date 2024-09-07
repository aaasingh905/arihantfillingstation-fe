import React, { useContext, useState } from "react";
import "./index.css";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { urlProd } from "../../constants";
import { UserContext } from "../../store/UserStore";
import { Navigate } from "react-router-dom";

function Login() {
  const { user, updateUserStore } = useContext(UserContext);
  const { token } = user;
  const [error, setError] = useState(false);
  const onFinish = (values) => {
    axios
      .post(`${urlProd}/login`, {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        if (res.status === 200) {
          updateUserStore({ token: res.data.token });
        }
      })
      .catch((err) => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  if (token) {
    return <Navigate to="/add" />;
  }

  return (
    <div className="login-container">
      <div className="login-form-cotainer">
        <h2>Login</h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            flex: "1",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            style={{ float: "end" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "#023047", float: "right" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        {error && (
          <span style={{ color: "red", paddingBottom: "40px" }}>
            Invalid Username or Password
          </span>
        )}
      </div>
    </div>
  );
}

export default Login;
