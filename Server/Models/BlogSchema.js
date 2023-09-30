const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    blogId: {
        type: String,
    },
    blogTitle: {
        type: String,
    },
    blogDesc: {
        type: String,
    },
    blogAuthor: {
        type: String,
    },
    blogDate: {
        date: {
            type: Date,
        },
        time: {
            type: String,
        },
    },
    blogImage: {
        data: String, // Store the image data as a Base64 encoded string
        contentType: String, // Content type of the image (e.g., 'image/jpeg', 'image/png')
        filename: String, // Name of the image file
    },
});

module.exports = mongoose.model('Blog', blogSchema);
