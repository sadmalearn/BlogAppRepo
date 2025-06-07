const blogs = require('../Models/BlogSchema')
const addBlogs = async (req, res) => {
  // Destructure based on new frontend keys 
  const {blogId, title, author, content, tags, category, published, publishedAt, blogImage } = req.body;

  try {
    // Check if blog with same title & publishedAt already exists to avoid duplicates (adjust as needed)
    const blogAvailable = await blogs.findOne({ title, publishedAt });

    if (blogAvailable) {
      return res.status(409).send({ message: 'Blog with same title and date already exists' });
    }

    // Create new blog document
    const blogCreate = await blogs.create({
        blogId,
      title,
      author,
      content,
      tags,
      category,
      published,
      publishedAt,
      blogImage,
    });
    console.log(blogCreate)
    if (blogCreate) {
      return res.status(201).send({ success: true, message: 'Blog created successfully!' });
    } else {
      return res.status(400).send({ success: false, message: 'Failed to create blog' });
    }
  } catch (error) {
    console.error("Error in addBlogs:", error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
}

const getBlogbyId = async (req, res) => {
    const { id } = req.params;
    try {
        const blogDetails = await blogs.findById({ _id: id });
        if (blogDetails) {
            res.send({ success: true, message: "Blog Details!", data: blogDetails });
        } else {
            res.send({ success: false, message: "Blog Not Found!" });
        }
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).send({ success: false, message: 'Something Went Wrong' });
    }
};
const updateBlog = async (req, res) => {
  const {
    title,
    author,
    content,
    tags,
    category,
    published,
    publishedAt,
    blogImage
  } = req.body;
  const { id } = req.params;

  try {
    const updatedBlog = await blogs.findByIdAndUpdate(
      id,
      {
        title,
        author,
        content,
        tags,
        category,
        published,
        publishedAt,
        blogImage
      },
      { new: true }
    );

    if (updatedBlog) {
      res.status(200).send({ message: 'Blog Updated Successfully!', success: true, data: updatedBlog });
    } else {
      res.status(404).send({ message: 'Blog Not Found or Update Failed', success: false });
    }
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).send({ message: 'Something Went Wrong', success: false });
  }
};


const getAllBlogs = async (req, res) => {
    try {
        const blogsData = await blogs.find().sort({ blogId: 1 });
        if (blogsData.length > 0) {
            res.send({ success: true, message: "Data fetched successfully!", data: blogsData });
        } else {
            res.send({ success: false, message: "No data found", data: [] });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Something went wrong", data: [] });
    }
}

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteBlog = await blogs.deleteOne({ blogId: id });
        if (deleteBlog) {
            const blogsData = await blogs.find().sort({ blogId: 1 });
            res.send({ success: true, message: "Blog Deleted Successfully!", data: blogsData });
        } else {
            res.send({ success: false, message: "Blog Not Found!" });
        }
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).send({ success: false, message: 'Something Went Wrong' });
    }
};
const getLastBlogId = async (req, res) => {
    try {
      const lastBlog = await blogs.findOne().sort({ _id: -1 });
      if (!lastBlog) {
        return res.status(404).json({ message: 'No documents found' });
      }
  
      const lastId = lastBlog.blogId;

      var no = parseInt(lastId.split("_")[1], 10) + 1;
      var nextId = ""; // Increase blogId by one
      if(no <= 9){
        nextId = "B_0" + no; 
      }else{
        nextId = "B_" + no; 
      }

      res.status(200).json({ data: nextId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
const welcomeBlog = async (req, res) => {
    res.send({ message: 'Welcome to Our Login.....' })
    console.log('welcome');
}

module.exports = { addBlogs, welcomeBlog, getAllBlogs, deleteBlog, updateBlog,getBlogbyId,getLastBlogId }