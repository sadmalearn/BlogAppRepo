import React from 'react'
import Blogs from './AdminComponent/Blogs'
import './Main.css'
import Header from '../Navigation/Header/Header'
import Footer from '../Navigation/Footer/Footer'
import { useHistory } from "react-router-dom";
import { HashRouter as Router, Route } from 'react-router-dom'
import AddBlogs from './UserComponent/AddBlogs'
const Main = () => {
  return (
    <div className='MainDiv'>
      <Router>
      <div className='content'>
        <div className='header'>
          <Header />
        </div>
        <div className='contentDiv'>
          
        <Route exact path="/main/AddBlogs" component={AddBlogs} />
        <Route exact path="/main/Blogs" component={Blogs} />

        {/* <Blogs /> */}
        </div>
        <div className='footer'>
            <Footer />
        </div>
      </div>
        </Router>
    </div>
  )
}

export default Main