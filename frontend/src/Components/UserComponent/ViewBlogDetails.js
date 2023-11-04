import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom'
import { Url } from '../../Constants/ApiUrlConstants'
import './viewBlogDetails.css'

const ViewBlogDetails = (props) => {
  const blogId = sessionStorage.getItem('BlogId')
  // console.log(props.location?.state?.data?._id);
  const [blogDetailstoShow, setBlogDetailstoShow] = useState({
  })
  useEffect(() => {
    fetch(Url.getBlogById.replace(':id',blogId), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseData) => {
        setBlogDetailstoShow(responseData.data)
      });
  }, [blogId])
  console.log('>>>>>>>>>>>', blogDetailstoShow)
  return (
    <div>
      <div className='mainHeadingImage'>
        <img src={blogDetailstoShow?.blogImage?.data} alt=''/>
        <div className='HeadingTitledata'>
          <div className='titleName'>
            
        <h3>{blogDetailstoShow?.blogTitle}</h3>
          </div>
        <div className='publishDate'>
        <small>{blogDetailstoShow?.blogDate?.date}</small>
          <small>{blogDetailstoShow?.blogDate?.time}</small>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ViewBlogDetails
