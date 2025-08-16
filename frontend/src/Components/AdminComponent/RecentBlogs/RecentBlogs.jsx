import React from "react";
import { Card, Button, Tooltip } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import "./RecentBlogs.scss";
import NotFound from '../../../Assets/NotFound.jpg'

const RecentBlogs = ({ blogs, onClick }) => { 

  const shareBlog = (blog) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.description,
        url: blog.url,
      });
    } else {
      navigator.clipboard.writeText(blog.url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="recent-blogs">
      {blogs?.map((blog) => (
        <Card
          key={blog._id}
          hoverable
          cover={
            <div className="card-image-wrapper">
              <img
                alt={blog.title}
                src={blog.blogImage?.data || NotFound}
                    style={{
                    height: "200px",
                    objectFit: "cover",
                    width: "100%",
                    borderRadius: "8px 8px 0 0",
                    opacity: blog.blogImage?.data ? 1 : 0.5
                    }}
              />
              {blog.category && (
                <span className="blog-category">{blog.category}</span>
              )}
            </div>
          }
        >
          <Tooltip title={blog.title}>
            <h3 className="blog-title">
              {blog.title.length > 40
                ? blog.title.slice(0, 40) + "..."
                : blog.title}
            </h3>
          </Tooltip>

          <Tooltip title={blog.content}>
            <p className="truncate-text">{blog.content}</p>
          </Tooltip>

          <div className="card-buttons">
            <Button type="primary" onClick={()=>{onClick(blog)}}>
              Read Article
            </Button>
            <Button
              type="default"
              icon={<ShareAltOutlined />}
              onClick={() => shareBlog(blog)}
            >
              Share
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RecentBlogs;
