const express = require('express')
const  {addBlogs, welcomeBlog, getAllBlogs, deleteBlog, updateBlog, getBlogbyId, getLastBlogId} = require('../Controller/blogController')
const { registerUser, login } = require('../Controller/authCOntroller')
const router = express.Router()


router.get('/welcomeBlog',welcomeBlog)
router.get('/getAllBlogs',getAllBlogs)
router.get('/getLastBlogId',getLastBlogId)
router.get('/getBlogbyId/:id',getBlogbyId)
router.delete('/deleteBlog/:id',deleteBlog)
router.put('/updateBlog/:id',updateBlog)
router.post('/addBlogs',addBlogs)
router.post('/registerUser',registerUser)
router.post('/login',login)

module.exports = router