const express = require('express')
const  {addBlogs, welcomeBlog} = require('../Controller/blogController')
const router = express.Router()


router.get('/welcomeBlog',welcomeBlog)
router.post('/addBlogs',addBlogs)

module.exports = router