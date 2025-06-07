const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  blogId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String], // Array of strings
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
  blogImage: {
    filename: String,
    contentType: String,
    data: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
