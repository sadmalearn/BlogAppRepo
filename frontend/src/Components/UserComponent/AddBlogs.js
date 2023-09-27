import React, { useState } from 'react'
import './AddBlogs.css'
import { Url } from '../../Constants/ApiUrlConstants';
const AddBlogs = () => {
    const [blogDetails, setBlogDetails] = useState({
        blogId : '',
        blogTitle : '',
        blogAuthor : '',
        blogDesc : '',
        blogDate : {
            date : '',
            time : ''
        },
        blogImage : {
            data : '',
            contentType : '',
            filename : ''
        },
        blogPublisher : ''
    })
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
      const newFiles = Array.from(e.target.files);
      const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };
      try {
        const base64Images = await Promise.all(newFiles.map(file => convertFileToBase64(file)));
        const newImages = newFiles.map((file, index) => ({
          fileName: file.name,
          contentType: file.type,
          data: base64Images[index],
        }));
        setBlogDetails({
          ...blogDetails,
          blogImage: newImages,
        });
      } catch (error) {
        console.error('Error converting images to base64:', error);
      }
    }
  };
  
  const handleAddBlog = () =>{
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
            console.log(res);
        }).catch((err) => {
            console.log("Submit Error", err)
          })
      } catch (error) {
        console.log("Submit Error", error);
      }
  }
  return (
    <div>
        <div className="form">
          <div className="form-body">
              <div className="username">
                  <label className="form__label" for="firstName">Blog Id </label>
                  <input type="text" onChange={(e)=>{handleChange(e,'blogId')}}></input>
              </div>
              <div className="lastname">
                  <label className="form__label" for="lastName">Blog Title </label>
                  <input type="text" onChange={(e)=>{handleChange(e,'blogTitle')}}></input>
              </div>
              <div className="email">
                  <label className="form__label" for="email">Blog Description </label>
                  <textarea onChange={(e)=>{handleChange(e,'blogDesc')}}></textarea>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Blog Author </label>
                  <input type="text" onChange={(e)=>{handleChange(e,'blogAuthor')}}></input>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Blog Author </label>
                  <input type="file" accept="image/*" onChange={(e)=>{handleChange(e,'blogImage')}}></input>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Blog Author </label>
                  <input type="date" onChange={(e)=>{handleChange(e,'blogDate')}}></input>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Blog Author </label>
                  <input type="time" onChange={(e)=>{handleChange(e,'blogDate')}}></input>
              </div>
              <div className="confirm-password">
                  <label className="form__label" for="confirmPassword">Blog publisher </label>
                  <input type="text" onChange={(e)=>{handleChange(e,'blogPublisher')}}></input>
              </div>
          </div>
          <div class="">
              <button type="submit" class="btn" onClick={()=>{handleAddBlog()}}>Register</button>
          </div>
      </div> 
    </div>
  )
}

export default AddBlogs
