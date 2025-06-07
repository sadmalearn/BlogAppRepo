const userCollection = require('../Models/authSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  try {
    const { email, password, confirmPassword, mobileNo, ...rest } = req.body;

    const errors = [];

    // Required field validations
    if (!email) errors.push('Email is required');
    if (!password) errors.push('Password is required');
    if (!confirmPassword) errors.push('Confirm Password is required');
    if (!mobileNo) errors.push('Mobile number is required');

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.push('Invalid email format');
    }

    // Mobile number validation
    const mobileRegex = /^\d{10}$/;
    if (mobileNo && !mobileRegex.test(mobileNo)) {
      errors.push('Mobile number must be exactly 10 digits');
    }

    // Password match check
    if (password && confirmPassword && password !== confirmPassword) {
      errors.push('Password and Confirm Password do not match');
    }

    // Check if user already exists
    const isUserRegistered = email ? await userCollection.findOne({ email }) : null;
    if (isUserRegistered) {
      errors.push('User has already been registered with this email');
    }

    // If there are any errors, return them all
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors,
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user payload
    const payload = {
      ...rest,
      email,
      mobileNo,
      password: hashedPassword,
    };

    // Save the new user
    const newUser = new userCollection(payload);
    await newUser.save();

    return res.status(201).json({
      message: 'User registered successfully',
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Something went wrong',
      success: false,
    });
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
  login,
};