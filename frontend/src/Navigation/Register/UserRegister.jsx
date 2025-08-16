import React, { useState } from "react";
import useApi from '../../Custom/useApi';
import {
  Form,
  Input,
  Button,
  Select,
  Card,
  Upload,
  message,
  Space,
  Avatar,
  Typography,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  EditOutlined,
  CheckCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Url } from "../../Constants/ApiUrlConstants";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
 
const { Title, Link,Text } = Typography; 

const UserRegister = ({ onRegister }) => {
  const { request, loading } = useApi();
  const history = useHistory()
  const [form] = Form.useForm();
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [sentCode, setSentCode] = useState(null);
  const [otpVisible, setOtpVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const dummyImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // default dummy avatar

    const onLogin = () => {
    history.push("/");
  };

  // Handle file upload and preview
  const handleUploadChange = ({ fileList }) => {
    if (fileList.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[0].originFileObj);
      reader.onload = () => setPreviewImage(reader.result);
    } else {
      setPreviewImage(null);
    }
  };

  // Send OTP
  const handleSendCode = async () => {
    if (!form.getFieldValue("email")) {
      message.error("Please enter your email first!");
      return;
    }
    const sendOtpPayload = {
      "email": form.getFieldValue("email")
    }
    const responseData = await request(Url.sendOtp, "POST", sendOtpPayload);
    console.log(responseData)
    setOtpVisible(responseData?.success);
    message.success(responseData?.message);
  };

  // Verify OTP
  const handleVerifyCode = async () => {

    const verifyOtpPayload = {
      "email": form.getFieldValue("email"),
      "otp": verificationCode
    }
    const responseData = await request(Url.verifyOtp, "POST", verifyOtpPayload);

    if (responseData?.success) {
      setEmailVerified(responseData?.success);
      setOtpVisible(!responseData?.success);
      message.success(responseData?.message);
    } else {
      message.error(responseData?.message);
    }
  };

  // Submit Form
  const onFinish = async (values) => {
    if (!emailVerified) {
      message.error("Please verify your email before registering!");
      return;
    }

    try {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        phone: values.phone,
        profileImage: previewImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        userRole: "user", // default role
        emailVerified: true
      };

      const responseData = await request(Url.registerUser, "POST", payload);
      console.log("Form Values:", payload);
      // if (onRegister) await onRegister(values);
      if (responseData?.success) {
        message.success(responseData?.message);
      } else {
        if (responseData?.errors && Array.isArray(responseData.errors)) {
          responseData.errors.forEach((err) => {
            message.error(err); // show each error separately
          });
        } else {
          message.error(responseData?.message || "Something went wrong");
        }
      }
    } catch (error) {
      console.error(error);
      message.error("Registration failed!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "80%",
          maxWidth: 700,
          borderRadius: 16,
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          padding: "30px",
        }}
      >
        <div style={{ padding: "10px" }}>
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: 25, color: "#333" }}
          >
            Create Your Account
          </Title>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            {/* Profile Image */}
            <Form.Item
              name="profileImage"
              rules={[
                { required: true, message: "Please upload your profile image" },
              ]}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 20,
                  position: "relative",
                }}
              >
                <Avatar
                  size={120}
                  src={previewImage || dummyImage}
                  style={{ border: "3px solid #667eea" }}
                />
                <Upload
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleUploadChange}
                >
                  <Button
                    shape="circle"
                    icon={<EditOutlined />}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: "calc(50% - 60px)",
                      transform: "translateX(50%)",
                      background: "#667eea",
                      color: "#fff",
                      border: "none",
                    }}
                  />
                </Upload>
              </div>
            </Form.Item>

            {/* Name */}
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your name" />
            </Form.Item>

            {/* Email with Send OTP / Verified */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter your email"
                disabled={emailVerified}
                addonAfter={
                  emailVerified ? (
                    <CheckCircleOutlined style={{ color: "green", fontSize: 18 }} />
                  ) : (
                    <Link onClick={handleSendCode} style={{ fontSize: 12 }}>
                      Send OTP
                    </Link>
                  )
                }
              />
            </Form.Item>

            {/* OTP Field - shows after clicking Send OTP */}
            {otpVisible && !emailVerified && (
              <Space style={{ display: "flex", marginBottom: 16 }}>
                <Input
                  placeholder="Enter OTP"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  onClick={handleVerifyCode}
                >
                  Verify
                </Button>
              </Space>
            )}

            {/* Phone Number */}
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Phone number must be exactly 10 digits",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Enter 10 digit phone number"
                maxLength={10}
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter password"
              />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm password"
              />
            </Form.Item>

            {/* Submit */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                style={{
                  borderRadius: 8,
                  background: "linear-gradient(90deg, #667eea, #764ba2)",
                  border: "none",
                }}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* Register Link */}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <Text>Already have an account? </Text>
          <Link onClick={onLogin}>Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default UserRegister;
