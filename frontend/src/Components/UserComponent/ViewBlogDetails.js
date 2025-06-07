import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom'
import { Url } from '../../Constants/ApiUrlConstants'
import './viewBlogDetails.css'
import { BsCalendar3 } from 'react-icons/bs'
import moment from "moment"
const ViewBlogDetails = (props) => {
  const blogId = sessionStorage.getItem('BlogId')
  // console.log(props.location?.state?.data?._id);
  const [blogDetailstoShow, setBlogDetailstoShow] = useState({
  })
  useEffect(() => {
    fetch(Url.getBlogById.replace(':id', blogId), {
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
        <img src={blogDetailstoShow?.blogImage?.data} alt='' />
        <div className='HeadingTitledata'>

          <div className='titleName'>

            <h3>{blogDetailstoShow?.blogId} - {blogDetailstoShow?.title}</h3>
          </div>
          <div className='blogAuthor'>
            <span>{blogDetailstoShow?.author}</span>
          </div>
        </div>
        <div className='blogSecondRowDetails'>
          <div className="blogCategoryAndTags">
            <span>
              {blogDetailstoShow?.category}
              {" - "}
              {blogDetailstoShow?.tags?.map((item, index) => (
                <small key={index}>
                  {item}
                  {index < blogDetailstoShow.tags.length - 1 ? ', ' : ''}
                </small>
              ))}
            </span>
          </div>

          <div className='blogDate'>
            {blogDetailstoShow?.publishedAt ? (
              <>
                <BsCalendar3 />{" "}
                <small>
                  {moment(blogDetailstoShow?.publishedAt).local().format("DD-MMM-YYYY hh:mm A")}
                </small>
              </>
            ) : (
              <small>No date available</small>
            )}
          </div>
        </div>

        <div className='blogDescription'>
          <p>{blogDetailstoShow?.content}</p>
        </div>
      </div>
    </div>
  )
}

export default ViewBlogDetails
