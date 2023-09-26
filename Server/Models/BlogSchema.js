const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    blogId : {
        type : 'String',
    },
    blogTitle : {
        type : 'String',
    },
    blogDesc : {
        type : 'String',
    },
    blogAuthor : {
        type : 'String',
    },
    blogPublisher : {
        type : 'String',
    },
})

module.exports = mongoose.model('blogDetails',blogSchema)