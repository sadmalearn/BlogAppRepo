import React from 'react'
import Blogs from './AdminComponent/Blogs'
import './Main.css'
import Header from '../Navigation/Header/Header'
import { HashRouter as Router, Route } from 'react-router-dom'
import ViewBlogDetails from './UserComponent/ViewBlogDetails'
import Login from '../Navigation/Login/login'
import Registration from '../Navigation/Login/registration'
import HowItWorks from './UserComponent/HowItWorks/HowItWorks'
const Main = () => {
  return (
    <div className='MainDiv'>
      <Router>
      <div className='content'>
        <div className='header'>
        <Route path="/main" component={Header} />

          {/* <Header /> */}
        </div>
        <div className='contentDiv'>
        
        <Route exact path="/" component={Login} />
        <Route exact path="/Registration" component={Registration} />
        <Route exact path="/main/Blogs" component={Blogs} />
        <Route exact path="/main/ViewBlog" component={ViewBlogDetails} />
<Route path="/main/HowItWorks" component={HowItWorks} />
        {/* <Blogs /> */}
        </div>
      </div>
        </Router>
    </div>
  )
}

export default Main