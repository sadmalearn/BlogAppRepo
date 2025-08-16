const express = require('express')
const { registerUser, login, sendOtp, verifyOtp } = require('../Controller/authController')
const router = express.Router()

router.post('/registerUser',registerUser)
router.post('/login',login)
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router