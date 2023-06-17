import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Blog',
    path: 'blog'
  },
  {
    title: 'Contact',
    path: 'contact'
  },
  {
    title: 'About',
    path: 'about'
  },
  {
    title: 'Login',
    path: 'login'
  }
]

function Navbar({ user }) {
  const [menuActive, setMenuActive] = useState(false);
  
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  }
  
  return (
    <div className='nav-container'>
      <div className='menu-title'>My Blog</div>

      {/* <div className='user'>
        <span className='menu-avatar'><Avatar style={{ backgroundColor: '#87d068' }} icon=    {<UserOutlined />} /></span>&nbsp;
        <span className='menu-username'>{`${user.firstName} ${user.lastName[0]}`}</span>
      </div> */}
            
      <nav ref={navRef}>
          <ul className='nav__list'>
            { navLinks.map((link, index) => (
              <li key={index} className='nav__item' onClick={showNavbar}>
                <Link to={link.path} className='nav__link'>
                  {link.title}
                </Link>
              </li>
            ))
            }

          <button className='nav-btn nav-close-btn' onClick={showNavbar}>
          <FaTimes />
          </button>
          </ul>
      </nav>

      <button className='nav-btn' onClick={showNavbar}>
        <FaBars />
      </button>
    </div>
  );
}

export default Navbar;
