import React, { useEffect, useState } from 'react'
import "./Blog.css"
import { Url } from '../../Constants/ApiUrlConstants';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Blogs = () => {
  const [blogData, setBlogdata] = useState()
  const [lastItem, setLastItem] = useState(null)
  const [AddBlogPopup, setAddBlogPopup] = useState(false);
  const [publishedDate, setPublishedDate] = useState('');
  const [publishedTime, setPublishedTime] = useState('');
  const [blogDetails, setBlogDetails] = useState({
    blogId: '', // ✅ Added blogId
    title: '',
    author: '',
    content: '',
    tags: [],
    category: '',
    published: true,
    publishedAt: '',
    blogImage: {
      data: '',
      contentType: '',
      filename: ''
    }
  });

  const history = useHistory();

  const generateBlogId = (category) => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // ✅ 6-digit random number
    return `${category}-${randomNumber}`;
  };

  useEffect(() => {
    if (publishedDate && publishedTime) {
      const isoDate = new Date(publishedDate + 'T' + publishedTime).toISOString()
      setBlogDetails(prev => ({
        ...prev,
        publishedAt: isoDate
      }))
    }
  }, [publishedDate, publishedTime]);

  const handleAddBugPopupCloseModal = () => {
    setAddBlogPopup(false);
  };

  const handleAddBlogShow = () => {
    setAddBlogPopup(true);
    setPublishedDate('');
    setPublishedTime('');
    setBlogDetails({
      blogId: '',
      title: '',
      author: '',
      content: '',
      tags: [],
      category: '',
      published: true,
      publishedAt: '',
      blogImage: {
        data: '',
        contentType: '',
        filename: ''
      }
    });
  };

  useEffect(() => {
    fetch(Url.getAllBlogs, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success && responseData.data.length > 0) {
          setBlogdata(responseData.data)
          setLastItem(responseData.data[responseData.data.length - 1]);
        }
      });
  }, []);

  const showDetails = (item) => {
    history.push({
      pathname: '/main/ViewBlog',
      state: { data: item }
    });
    sessionStorage.setItem('BlogId', item?._id);
  };

  const handleChange = async (e, field) => {
    if (field === 'publishedDate') {
      setPublishedDate(e.target.value);
    } else if (field === 'publishedTime') {
      setPublishedTime(e.target.value);
    } else if (field === 'blogImage') {
      const newFile = e.target.files[0];
      if (!newFile) return;

      const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };

      try {
        const base64Image = await convertFileToBase64(newFile);
        const newImage = {
          filename: newFile.name,
          contentType: newFile.type,
          data: base64Image,
        };
        setBlogDetails(prev => ({
          ...prev,
          blogImage: newImage,
        }));
      } catch (error) {
        console.error('Error converting image to base64:', error);
      }
    } else if (field === 'tags') {
      setBlogDetails(prev => ({
        ...prev,
        tags: e.target.value.split(',').map(tag => tag.trim())
      }));
    } else if (field === 'published') {
      setBlogDetails(prev => ({
        ...prev,
        published: e.target.checked
      }));
    } else if (field === 'category') {
      const categoryValue = e.target.value;
      setBlogDetails(prev => ({
        ...prev,
        category: categoryValue,
        blogId: generateBlogId(categoryValue) // ✅ Auto-generate blogId
      }));
    } else {
      setBlogDetails(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    }
  };

  const handleAddBlog = () => {
    try {
      fetch(Url.addBlogs, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(blogDetails),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            alert('Blog added successfully');
            setAddBlogPopup(false);
          } else {
            alert('Failed to add blog');
          }
        })
        .catch((err) => {
          console.log("Submit Error", err)
        })
    } catch (error) {
      console.log("Submit Error", error);
    }
  }
console.log(lastItem)
  return (
    <div>
      {/* ...existing blog listing code remains unchanged... */}
<div className='addDIv'>
        <button type="button" className='AddBlogDetails' onClick={handleAddBlogShow}>Add Blog</button>
      </div>

      <div className="page-header">
        <div className="container">
          <div className="HeadingContent" >
            <span className='blogCategory'>{lastItem?.category}</span>
            <img className='headingImage' src={lastItem?.blogImage?.data} alt="" />
            <div className="HeadContent">
              <h1>{lastItem?.title}</h1>
              <p>{lastItem?.content}</p>
              <button type="button" className='button' onClick={() => { showDetails(lastItem) }}>Read Article</button>
            </div>
          </div>
        </div>
      </div>

      <div className='BlogDivs'>
        <div className='LastFewBlogs'>
          {blogData?.map((item, i) => {
            if (item._id !== lastItem._id && i < 2) {
              return (
                <div className="BlogDiv" key={item._id}>
                  <div className="card-blog">
                    <span className='blogCategory'>{item?.category}</span>
                    <div className="blog-card-body px-1 pt-3">
                      <img src={item?.blogImage?.data} alt="" />
                      <h5>{item?.title}</h5>
<p>
  {item?.tags?.slice(0, 3).map((tag, index) => (
    <span key={index}>
      {tag}
      {index < 2 ? ', ' : ''}
    </span>
  ))} 
</p>


                      <p>
                        {item?.content.substring(0, 100)}...
                      </p> 
                      <button type="button" className="readArticle" onClick={() => showDetails(item)}>Read article</button>
                    </div>
                  </div>
                </div>
              )
            }
            return null;
          })}
        </div>
        <div className='rightBlogDiv'>
          {blogData?.map((item, i) => {
            if (item._id !== lastItem._id && i >= 2 && i <= 4) {
              return (
                <div className='listOfBlogs' key={item._id}>
                  <h5>{item.title}</h5>
                  <p>{item.content}</p>
                  <span className='text-sm '>Read More</span>
                </div>
              )
            }
            return null;
          })}
        </div>
      </div>
      <ReactModal
        isOpen={AddBlogPopup}
        contentLabel="Add Blog Modal"
        className="Modal BugCreateModal ModalWidth"
        overlayClassName="Overlay"
        onRequestClose={handleAddBugPopupCloseModal}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
      >
        <div className="bug_modal_close" onClick={handleAddBugPopupCloseModal}>
          <span>X</span>
        </div>
        <div className="bug_modal_title">Add Blog</div>
        <div className="bug_modal_body">

          <div className="form-group">
            <label>Blog Title</label>
            <input type="text" value={blogDetails.title} onChange={(e) => handleChange(e, 'title')} />
          </div>

          <div className="form-group">
            <label>Blog Author</label>
            <input type="text" value={blogDetails.author} onChange={(e) => handleChange(e, 'author')} />
          </div>

          <div className="form-group">
            <label>Blog Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleChange(e, 'blogImage')} />
          </div>

          <div className="form-group">
            <label>Published Date</label>
            <input type="date" value={publishedDate} onChange={(e) => handleChange(e, 'publishedDate')} />
          </div>

          <div className="form-group">
            <label>Published Time</label>
            <input type="time" value={publishedTime} onChange={(e) => handleChange(e, 'publishedTime')} />
          </div>

          <div className="form-group" style={{ width: '95%' }}>
            <label>Blog Description</label>
            <textarea value={blogDetails.content} onChange={(e) => handleChange(e, 'content')} />
          </div>

          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input type="text" value={blogDetails.tags.join(', ')} onChange={(e) => handleChange(e, 'tags')} />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input type="text" value={blogDetails.category} onChange={(e) => handleChange(e, 'category')} />
          </div>

          <div className="form-group">
            <label>Generated Blog ID</label>
            <input type="text" value={blogDetails.blogId} readOnly />
          </div>

          <div className="form-group publishedDiv" style={{ display: "flex" }}>
            <label>Published</label>
            <input
              type="checkbox"
              checked={blogDetails.published}
              onChange={(e) => handleChange(e, 'published')}
            />
          </div>

          <div className="bug_modal_footer">
            <button type="button" className='submitBtn' onClick={handleAddBlog}>Submit</button>
            <button type="button" className='cancelBtn' onClick={handleAddBugPopupCloseModal}>Cancel</button>
          </div>
        </div>
      </ReactModal>
    </div>
  )
}

export default Blogs;
