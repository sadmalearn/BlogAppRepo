import React, { useEffect, useState } from 'react'
import "./Blog.css"
import { Url } from '../../Constants/ApiUrlConstants';
const Blogs = () => {
  const [blogData, setBlogdata] = useState()
  const [lastItem, setLastItem] = useState(null)
  useEffect(() => {
    fetch(Url.getAllBlogs, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData.success && responseData.data.length > 0) {
          setBlogdata(responseData.data)
          setLastItem(responseData.data[responseData.data.length - 1]); // Set the last item
        }
      });
  }, []);
  const showDetails = (item) => {
    fetch(Url.getBlogById.replace(":id", item._id), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      });
  }
  return (
    <div>
      <div>
        <div className="page-header">
          <div className="container">
            <div className="HeadingContent" >
                <img className='headingImage' src={lastItem?.blogImage?.data} alt="" />
              <div className="HeadContent">
                <h1 className="">{lastItem?.blogTitle}</h1>
                <p className="">{lastItem?.blogDesc}</p>
                <button type="button" className='button' onClick={() => { showDetails(lastItem) }}>Read Article</button>
              </div>
            </div>
          </div>
        </div>
        <div className='LastFewBlogs'>
          {blogData?.map((item,i) => {
            if (item._id != lastItem._id && i < 2) {
              return (
                <div class="BlogDiv">
                  <div class="card-blog">
                    <div class="blog-card-body px-1 pt-3">
                      <h5>{item?.blogTitle}</h5>
                      <p class="text-sm">{item?.blogDesc}</p>
                      <button type="button" class="btn btn-outline-primary btn-sm">Read article</button>
                    </div>
                  </div>
                </div>
              )
            }
          })
          }
        </div>
      </div>
    </div>
  )
}

export default Blogs