import React from 'react'
import Blogs from './AdminComponent/Blogs'
import './Main.css'
import Header from '../Navigation/Header/Header'
import { HashRouter as Router, Route } from 'react-router-dom'
import ViewBlogDetails from './UserComponent/ViewBlogDetails'
const Main = () => {
  return (
    <div className='MainDiv'>
      <Router>
      <div className='content'>
        <div className='header'>
          <Header />
        </div>
        <div className='contentDiv'>
          
        <Route exact path="/main/ViewBlog" component={ViewBlogDetails} />
        <Route exact path="/main/Blogs" component={Blogs} />

        {/* <Blogs /> */}
        </div>
      </div>
        </Router>
    </div>
  )
}

export default Main