import React, { useEffect, useState } from "react";
import { Url } from "../../Constants/ApiUrlConstants";
import { BsCalendar3, BsHeart, BsHeartFill, BsShare } from "react-icons/bs";
import moment from "moment";
import "./viewBlogDetails.css";

const ViewBlogDetails = () => {
  const blogId = sessionStorage.getItem("BlogId");

  const [blogDetails, setBlogDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(Url.getBlogById.replace(":id", blogId), { method: "GET" })
      .then((response) => response.json())
      .then((responseData) => {
        setBlogDetails(responseData.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [blogId]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Blog link copied to clipboard!");
  };

  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      const newComment = {
        name: "John Doe", // Replace with actual logged-in user
        date: new Date(),
        profileImage: "https://i.pravatar.cc/40", // Random avatar
        text: commentText,
      };
      setComments((prev) => [...prev, newComment]);
      setCommentText("");
    }
  };

  return (
    <div className="view-blog">
      {loading ? (
        <div className="view-blog__skeleton">
          <div className="view-blog__skeleton-image"></div>
          <div className="view-blog__skeleton-title"></div>
          <div className="view-blog__skeleton-author"></div>
          <div className="view-blog__skeleton-meta"></div>
          <div className="view-blog__skeleton-content"></div>
        </div>
      ) : (
        <>
          <div className="view-blog__card">
            <div className="view-blog__image-wrapper">
              <img
                src={blogDetails?.blogImage?.data}
                alt={blogDetails?.title || "Blog"}
                className="view-blog__image"
              />
            </div>

            <div className="view-blog__content-wrapper">
              <h1 className="view-blog__title">{blogDetails?.title}</h1>
              <div className="view-blog__meta">
                <span className="view-blog__author">✍ {blogDetails?.author}</span>
                <span className="view-blog__date">
                  <BsCalendar3 />{" "}
                  {blogDetails?.publishedAt
                    ? moment(blogDetails?.publishedAt)
                        .local()
                        .format("DD MMM YYYY, hh:mm A")
                    : "No date available"}
                </span>
              </div>

              <div className="view-blog__tags">
                <span className="view-blog__category">{blogDetails?.category}</span>
                {blogDetails?.tags
                  ?.filter((tag) => tag && tag.trim() !== "")
                  .map((tag, index) => (
                    <span key={index} className="view-blog__tag">
                      {tag}
                    </span>
                  ))}
              </div>

              <p className="view-blog__content">{blogDetails?.content}</p>

              {/* Like & Share */}
              <div className="view-blog__actions">
                <button className="view-blog__like-btn" onClick={handleLike}>
                  {liked ? (
                    <BsHeartFill className="liked" />
                  ) : (
                    <BsHeart />
                  )}
                  <span>{likes}</span>
                </button>
                <button className="view-blog__share-btn" onClick={handleShare}>
                  <BsShare /> Share
                </button>
              </div>

              {/* Comments Section */}
              <div className="view-blog__comments">
                <h3 className="view-blog__comments-title">Comments</h3>
                <div className="view-blog__comment-box">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                  ></textarea>
                  <button onClick={handleAddComment}>Post</button>
                </div>
                <div className="view-blog__comment-list">
                  {comments.length > 0 ? (
                    comments.map((c, i) => (
                      <div key={i} className="view-blog__comment">
                        <img
                          src={c.profileImage}
                          alt={c.name}
                          className="view-blog__comment-avatar"
                        />
                        <div className="view-blog__comment-details">
                          <div className="view-blog__comment-header">
                            <span className="view-blog__comment-name">{c.name}</span>
                            <span className="view-blog__comment-date">
                              {moment(c.date).format("DD MMM YYYY, hh:mm A")}
                            </span>
                          </div>
                          <p className="view-blog__comment-text">{c.text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="view-blog__no-comments">No comments yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewBlogDetails;
