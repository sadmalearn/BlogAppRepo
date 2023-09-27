const blogs = require('../Models/BlogSchema')
const addBlogs = async (req, res) => {
    const { blogId, blogTitle,blogDesc, blogAuthor,blogDate, blogPublisher, blogImage } = req.body
    const blogAvailable = await blogs.findOne({ blogId })
    if (blogAvailable) {
        res.send({ message: 'Blog Id Present' })
    } else {
        const blogCreate = await blogs.create({
            blogId, blogTitle,blogDesc, blogAuthor,blogDate, blogPublisher,blogImage
        })
        if (blogCreate) {
            res.send({ status: 200, success: true, message: 'Blog Created Succesfully !' })
        } else {
            res.send({ status: 400, success: false, message: 'Something Went Wrong' })
        }
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
    const { blogId, blogTitle,blogDesc, blogAuthor, blogPublisher } = req.body;
    const { id } = req.params;
    try {
        const updatedBlog = await blogs.findByIdAndUpdate(
            id,
            { blogId, blogTitle,blogDesc, blogAuthor, blogPublisher },
            { new: true }
        );
        if (updatedBlog) {
            res.send({ message: 'Blog Updated Successfully!' });
        } else {
            res.status(500).send({ message: 'Blog Not Found or Update Failed' });
        }
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).send({ message: 'Something Went Wrong' });
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
        const deleteStudent = await blogs.deleteOne({ blogId: id });
        if (deleteStudent) {
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

const welcomeBlog = async (req, res) => {
    res.send({ message: 'Welcome to Our Login.....' })
    console.log('welcome');
}

module.exports = { addBlogs, welcomeBlog, getAllBlogs, deleteBlog, updateBlog,getBlogbyId }