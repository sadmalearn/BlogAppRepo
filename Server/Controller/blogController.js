const blogs = require('../Models/BlogSchema')


const addBlogs = async(req, res) =>{
    console.log(req)
}
const welcomeBlog = async (req, res) => {
    res.send({ message: 'Welcome to Our Login.....' })
    console.log('welcome');
}

module.exports = {addBlogs,welcomeBlog}