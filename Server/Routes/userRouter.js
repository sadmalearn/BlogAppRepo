const express = require('express')
const { registerUser, login } = require('../Controller/authCOntroller')
const router = express.Router()

router.post('/registerUser',registerUser)
router.post('/login',login)

module.exports = router