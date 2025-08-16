import React, { useState, useRef, useEffect } from "react";
import { Card, Form, Input, Button, Space, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const { Link, Text } = Typography;

const ForgotPassword = ({ }) => {

  const history = useHistory();
  const [form] = Form.useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [timer, setTimer] = useState(0);
  const otpInputs = useRef([]);

  // Countdown effect
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
    setTimer(30);
    message.success(`OTP sent to ${email} (Demo: ${otp})`);
  };

  const handleOTPChange = (value, index) => {
    if (value.length > 1) return;
    const otpValues = form.getFieldValue("otp") || Array(6).fill("");
    otpValues[index] = value;
    form.setFieldsValue({ otp: otpValues });

    if (value && index < 5) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !form.getFieldValue("otp")[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const onFinish = (values) => {
    const enteredOTP = (values.otp || []).join("");
    if (enteredOTP !== generatedOTP) {
      message.error("Invalid OTP!");
      return;
    }
    if (values.newPassword !== values.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }
    message.success("Password reset successful!");
    form.resetFields();
    setOtpSent(false);
    setTimer(0);
    if (onBackToLogin) onBackToLogin();
  };

  const onBackToLogin = () => {
    history.push('/')
  }
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
      <Card title="Forgot Password" style={{ width: 420, borderRadius: 8 }}>
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

          {/* Send/Resend OTP */}
          <div style={{ marginBottom: 12 }}>
            {timer > 0 ? (
              <Text type="secondary">Resend OTP in {timer}s</Text>
            ) : (
              <Link onClick={handleSendOTP}>
                {otpSent ? "Resend OTP" : "Send OTP"}
              </Link>
            )}
          </div>

          {/* OTP */}
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

          {/* New Password */}
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: "Please enter your new password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter new password"
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm new password"
            />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Reset Password
            </Button>
          </Form.Item>
        </Form>

        {/* Back to Login */}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <Link onClick={onBackToLogin}>Back to Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
