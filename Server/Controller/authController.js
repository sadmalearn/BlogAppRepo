const userCollection = require('../Models/authSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const isUserRegistered = await userCollection.findOne({ email: req.body.email })
    if (isUserRegistered != null) {
      return res.status(409).send({ message: 'user has already been regestered with this mail', success: false })
    }
    async function getHashedPass(password) {
      return await bcrypt.hash(password, 10);
    }
    const payload = { ...req.body };
    payload.password = await getHashedPass(req.body.password);
  
    const newUser = new userCollection(payload);
  
    try {
      await newUser.save();
      res.send({
        message: 'user Registered Sucessfully',
        success: true,
      })
    }
    catch (error) {
      res.send({ message: error.message })
    }
  
  }
  const login = async (req, res) => {
    const isUserRegistered = await userCollection.findOne({ email: req.body.email })
    const user = await userCollection.findOne({ email: req.body.email });
  
    // if user registered or not
    if (isUserRegistered != null) {

      const matchPassword = await bcrypt.compare(req.body.password, user.password);
  
      if (matchPassword == true) {
        res.send({status : 200, success: true, message: 'Logged In Sucessfully'});
      }
      else {
        res.send({status : 500, success: false, message: "Invalid Username or password" })
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