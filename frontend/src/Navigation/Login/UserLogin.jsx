import React, { useState, useRef, useEffect } from "react";
import { Form, Input, Button, Card, Space, message, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const { Link, Text } = Typography;

const UserLogin = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [loginMode, setLoginMode] = useState("password");
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [timer, setTimer] = useState(0);
  const otpInputs = useRef([]);

  // Initialize OTP as an array
  useEffect(() => {
    form.setFieldsValue({ otp: Array(6).fill("") });
  }, [form]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOTP = () => {
    const email = form.getFieldValue("email");
    if (!email) {
      message.error("Please enter your email first!");
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    setOtpSent(true);
    setTimer(30); // Start 30s countdown
    message.success(`OTP sent to ${email} (Demo: ${otp})`);
  };

  const handleOTPChange = (value, index) => {
    if (value.length > 1) return;

    let otpValues = form.getFieldValue("otp");
    if (!Array.isArray(otpValues)) {
      otpValues = Array(6).fill("");
    } else {
      otpValues = [...otpValues];
    }

    otpValues[index] = value;
    form.setFieldsValue({ otp: otpValues });

    if (value && index < 5) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      (!form.getFieldValue("otp")[index] || form.getFieldValue("otp")[index] === "") &&
      index > 0
    ) {
      otpInputs.current[index - 1].focus();
    }
  };

  const onFinish = (values) => {
    if (loginMode === "otp") {
      if (!otpSent) {
        message.error("Please request an OTP first!");
        return;
      }
      const enteredOTP = (values.otp || []).join("");
      if (enteredOTP !== generatedOTP) {
        message.error("Invalid OTP!");
        return;
      }
    }

    message.success("Login successful!");
    form.resetFields();
    setOtpSent(false);
    setTimer(0);
  };

  const onForgotPassword = () => {
    history.push("/forgot-password");
  };

  const onRegister = () => {
    history.push("/register");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <Card title="Login" style={{ width: 420, borderRadius: 8 }}>
        {/* Toggle Buttons */}
        <Space style={{ marginBottom: 20 }}>
          <Button
            type={loginMode === "password" ? "primary" : "default"}
            onClick={() => setLoginMode("password")}
          >
            Login with Password
          </Button>
          <Button
            type={loginMode === "otp" ? "primary" : "default"}
            onClick={() => setLoginMode("otp")}
          >
            Login with OTP
          </Button>
        </Space>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          {/* Password Login */}
          {loginMode === "password" && (
            <>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                />
              </Form.Item>

              <div style={{ marginBottom: 16 }}>
                <Link onClick={onForgotPassword}>Forgot Password?</Link>
              </div>
            </>
          )}

          {/* OTP Login */}
          {loginMode === "otp" && (
            <>
              <div style={{ marginBottom: 12 }}>
                {timer > 0 ? (
                  <Text type="secondary">Resend OTP in {timer}s</Text>
                ) : (
                  <Link onClick={handleSendOTP}>
                    {otpSent ? "Resend OTP" : "Send OTP"}
                  </Link>
                )}
              </div>

              <Form.Item
                name="otp"
                label="Enter OTP"
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value || value.some((digit) => digit === "")) {
                        return Promise.reject("Please enter complete OTP");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Space>
                  {Array(6)
                    .fill("")
                    .map((_, index) => (
                      <Input
                        key={index}
                        maxLength={1}
                        style={{ width: 40, textAlign: "center" }}
                        ref={(el) => (otpInputs.current[index] = el)}
                        onChange={(e) => handleOTPChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                      />
                    ))}
                </Space>
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {loginMode === "password" ? "Login" : "Verify & Login"}
            </Button>
          </Form.Item>
        </Form>

        {/* Register Link */}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <Text>Don't have an account? </Text>
          <Link onClick={onRegister}>Register Here</Link>
        </div>
      </Card>
    </div>
  );
};

export default UserLogin;
 