import React, { useEffect, useState } from 'react'
import "./Blog.css"
import { Url } from '../../Constants/ApiUrlConstants';
import ReactModal from 'react-modal';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
const Blogs = () => {
  const [blogData, setBlogdata] = useState()
  const [lastItem, setLastItem] = useState(null)
  const [AddBlogPopup, setAddBlogPopup] = useState(false);
  const [blogDetails, setBlogDetails] = useState({
    blogId: '',
    blogTitle: '',
    blogAuthor: '',
    blogDesc: '',
    blogDate: {
      date: '',
      time: ''
    },
    blogImage: {
      data: '',
      contentType: '',
      filename: ''
    }
  })
  const handleAddBugPopupCloseModal = () => {
    setAddBlogPopup(false);
  };
  const handleAddBlogShow = () => {
    setAddBlogPopup(true);
    fetch(Url.getLastBlogId, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.data);
        setBlogDetails({
          ...blogDetails,
          ['blogId']: responseData.data
        })
      });
  }
  console.log(blogDetails);
  useEffect(() => {
    fetch(Url.getAllBlogs, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success && responseData.data.length > 0) {
          setBlogdata(responseData.data)
          setLastItem(responseData.data[responseData.data.length - 1]); // Set the last item
        }
      });
  }, []);
  const showDetails = (item) => {
    console.log(item);

  }


  const handleChange = async (e, field) => {
    if (field !== 'blogImage' && field !== 'blogDate') {
      const actualValue = e.target.value;
      setBlogDetails({
        ...blogDetails,
        [field]: actualValue
      });
    } else if (field === 'blogDate') {
      if (e.target.type === 'date') {
        setBlogDetails({
          ...blogDetails,
          blogDate: {
            ...blogDetails.blogDate,
            date: e.target.value,
          },
        });
      } else {
        setBlogDetails({
          ...blogDetails,
          blogDate: {
            ...blogDetails.blogDate,
            time: e.target.value,
          },
        });
      }
    } else {
      const newFile = e.target.files[0];
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
          fileName: newFile.name,
          contentType: newFile.type,
          data: base64Image,
        };
        setBlogDetails({
          ...blogDetails,
          blogImage: newImage,
        });
      } catch (error) {
        console.error('Error converting images to base64:', error);
      }
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
        }).catch((err) => {
          console.log("Submit Error", err)
        })
    } catch (error) {
      console.log("Submit Error", error);
    }
  }
  return (
    <div>
      <div>
        <div className='addDIv'>
          <button type="button" className='AddBlogDetails' onClick={handleAddBlogShow}>Add Blog</button>
        </div>
        <div className="page-header">
          <div className="container">
            <div className="HeadingContent" >
              <img className='headingImage' src={lastItem?.blogImage?.data} alt="" />
              <div className="HeadContent">
                <h1 className="">{lastItem?.blogTitle}</h1>
                <p className="">{lastItem?.blogDesc}</p>
                <NavLink to='/main/ViewBlogs'>
                  <button type="button" className='button' onClick={() => { showDetails(lastItem) }}>Read Article</button></NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className='BlogDivs'>
          <div className='LastFewBlogs'>
            {blogData?.map((item, i) => {
              if (item._id != lastItem._id && i < 2) {
                return (
                  <div class="BlogDiv">
                    <div class="card-blog">
                      <div class="blog-card-body px-1 pt-3">
                        <img src={item?.blogImage?.data} alt="" />
                        <h5>{item?.blogTitle}</h5>
                        <p class="text-sm">{item?.blogDesc}</p>
                        <button type="button" class="readArticle">Read article</button>
                      </div>
                    </div>
                  </div>
                )
              }
            })
            }
          </div>
          <div className='rightBlogDiv'>
            {blogData?.map((item, i) => {
              if (item._id != lastItem._id && i >= 2 && i <= 4) {
                return (
                  <div className='listOfBlogs'>
                    <h5>{item.blogTitle}</h5>
                    <p>{item.blogDesc}</p>
                    <span className='text-sm '>Read More</span>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={AddBlogPopup}
        contentLabel="Minimal Modal"
        className="Modal BugCreateModal ModalWidth"
        overlayClassName="Overlay"
        onRequestClose={handleAddBugPopupCloseModal}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
      >
        <div className="bug_modal_close" onClick={handleAddBugPopupCloseModal}>
          <span >X</span>
        </div>
        <div className="bug_modal_title">Add Blog</div>
        <div className="bug_modal_body">
          <div className="username">
            <label className="form__label" for="firstName">Blog Id </label>
            <input type="text" value={blogDetails.blogId} onChange={(e) => { handleChange(e, 'blogId') }}></input>
          </div>
          <div className="lastname">
            <label className="form__label" for="lastName">Blog Title </label>
            <input type="text" onChange={(e) => { handleChange(e, 'blogTitle') }}></input>
          </div>
          <div className="password">
            <label className="form__label" for="password">Blog Author </label>
            <input type="text" onChange={(e) => { handleChange(e, 'blogAuthor') }}></input>
          </div>
          <div className="password">
            <label className="form__label" for="password">Blog Image </label>
            <input type="file" className='inputFile' accept="image/*" onChange={(e) => { handleChange(e, 'blogImage') }}></input>
          </div>
          <div className="password">
            <label className="form__label" for="password">Blog Date </label>
            <input type="date" onChange={(e) => { handleChange(e, 'blogDate') }}></input>
          </div>
          <div className="password">
            <label className="form__label" for="password">Blog Time </label>
            <input type="time" onChange={(e) => { handleChange(e, 'blogDate') }}></input>
          </div>

          <div className="email" style={{ width: '95%' }}>
            <label className="form__label" for="email">Blog Description </label>
            <textarea onChange={(e) => { handleChange(e, 'blogDesc') }}></textarea>
          </div>
        </div>

        <div className='bug_modal_footer'>
          <button type="button">Reset</button>
          <button type="button" className='SaveBugBtn' onClick={handleAddBlog}>Submit</button>
        </div>
      </ReactModal>
    </div>
  )
}

export default Blogs