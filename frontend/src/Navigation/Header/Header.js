import React from 'react'
import "./Header.css"
import { NavLink } from 'react-router-dom/cjs/react-router-dom'
const Header = () => {
    return (
        <div className='headerDetails'>
            <div className='logoDiv'>
                logo
            </div>
            <div className='menuDiv'>
                <ul class="navbar-nav">
                    <NavLink to='/main/Blogs'>
                        <li class="nav-item">
                            Show Blogs
                        </li>
                    </NavLink>

                    <NavLink to='/main/AddBlogs'>
                        <li class="nav-item">Add Blogs
                        </li>
                    </NavLink>
                    <li class="nav-item">
                        How it works

                    </li>
                    <li class="nav-item">
                        Blog

                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header