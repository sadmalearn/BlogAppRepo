import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Header.css"

const Header = () => {
  return (
    <header className="headerDetails">
      <div className="logoDiv">
        <span className="logoText">MyBlogSite</span>
      </div>
      <nav className="menuDiv">
        <ul className="navbar-nav">
          <li>
            <NavLink to='/main/Blogs' className="nav-item" activeclassname="active">
              Show Blogs
            </NavLink>
          </li> 
          <NavLink to='/main/HowItWorks' className="nav-item" activeclassname="active">
  How it works
</NavLink>

          <li className="nav-item">Blog</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
