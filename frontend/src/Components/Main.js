import React from 'react'
import Blogs from './AdminComponent/Blogs'
import './Main.css'
import Header from '../Navigation/Header/Header'
import { HashRouter as Router, Route } from 'react-router-dom'
import ViewBlogDetails from './UserComponent/ViewBlogDetails'
import Login from '../Navigation/Login/UserLogin'
import Registration from '../Navigation/Register/UserRegister'
import HowItWorks from './UserComponent/HowItWorks/HowItWorks'
import ForgotPassword from '../Navigation/ForgotPassword/ForgotPassword'
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
            <Route exact path="/register" component={Registration} />
            <Route exact path="/main/Blogs" component={Blogs} />
            <Route exact path="/main/ViewBlog" component={ViewBlogDetails} />
            <Route path="/main/HowItWorks" component={HowItWorks} />
            <Route path="/forgot-password" component={ForgotPassword} />
            {/* <Blogs /> */}
          </div>
        </div>
      </Router>
    </div>
  )
}

export default Main