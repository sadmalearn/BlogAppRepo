const express = require('express')
const  {addBlogs, welcomeBlog, getAllBlogs, deleteBlog, updateBlog, getBlogbyId} = require('../Controller/blogController')
const router = express.Router()


router.get('/welcomeBlog',welcomeBlog)
router.get('/getAllBlogs',getAllBlogs)
router.get('/getBlogbyId/:id',getBlogbyId)
router.delete('/deleteBlog/:id',deleteBlog)
router.put('/updateBlog/:id',updateBlog)
router.post('/addBlogs',addBlogs)

module.exports = router