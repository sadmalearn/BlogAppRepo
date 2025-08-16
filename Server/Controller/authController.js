const userCollection = require('../Models/authSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateOtp = require("../Utils/otp");
const sendMail = require("../Utils/mailer");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone, profileImage, userRole, ...rest } = req.body;

    const errors = [];

    // Required field validations
    if (!name) errors.push("Full name is required");
    if (!email) errors.push("Email is required");
    if (!password) errors.push("Password is required");
    if (!confirmPassword) errors.push("Confirm Password is required");
    if (!phone) errors.push("Phone number is required");

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.push("Invalid email format");
    }

    // Phone number validation (10 digits only)
    const phoneRegex = /^\d{10}$/;
    if (phone && !phoneRegex.test(phone)) {
      errors.push("Phone number must be exactly 10 digits");
    }

    // Password match check
    if (password && confirmPassword && password !== confirmPassword) {
      errors.push("Password and Confirm Password do not match");
    }

    // Check if user already exists
    const isUserRegistered = email ? await userCollection.findOne({ email }) : null;
    if (isUserRegistered) {
      errors.push("User has already been registered with this email");
    }

    // If there are any errors, return them all
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user payload
    const payload = {
      name,
      email,
      phone,
      profileImage: profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      password: hashedPassword,
      userRole: userRole || "user",
      emailVerified: true, // since you verify in frontend before submit
      ...rest,
    };

    // Save the new user
    const newUser = new userCollection(payload);
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};


// Send OTP
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    let user = await userCollection.findOne({ email });

    if (!user) {
      // if user not registered yet, create temp record (will update later)
      user = new userCollection({
        name: "Temp",
        email,
        password: "tempPass123", // dummy, can be updated on registration
        phone: "0000000000", // dummy phone
      });
    }

    const otp = generateOtp();
    const expiry = Date.now() + 5 * 60 * 1000; // 5 min

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

    // send via email
    await sendMail(
      email,
      "Your OTP Code 🔑",
      {
        username: "Raphik",
        otp: otp, // random 6-digit OTP
        validityMinutes: 5,
      }
    );

    return res.json({
      success: true,
      message: "OTP sent successfully to email",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Verify OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const user = await userCollection.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // Mark email verified
    user.emailVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const login = async (req, res) => {
  const isUserRegistered = await userCollection.findOne({ email: req.body.email })
  const user = await userCollection.findOne({ email: req.body.email });

  // if user registered or not
  if (isUserRegistered != null) {

    const matchPassword = await bcrypt.compare(req.body.password, user.password);

    if (matchPassword == true) {
      res.send({ status: 200, success: true, message: 'Logged In Sucessfully' });
    }
    else {
      res.send({ status: 500, success: false, message: "Invalid Username or password" })
    }
  }
  else {
    res.send({ success: false, message: "User Not Found" });
  }
}

module.exports = {
  registerUser,
  sendOtp,
  verifyOtp,
  login,
};