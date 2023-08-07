import React from 'react'
import './Header.css'
import { motion } from 'framer-motion'

import { Container, Row } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/images/eco-logo.png'
import userIcon from '../../assets/images/user-icon.png'

const nav__links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/shop',
    display: 'Shop'
  },
  {
    path: '/cart',
    display: 'Cart'
  },
]

const Header = () => {
  return (
    <header className='header'>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={Logo} alt="logo" />
              <div>
                <h1>Multimart</h1>
              </div>
            </div>

            <div className="navigation">
              <ul className='menu'>
                {
                  nav__links.map((item, index) => (
                    <li className='nav__item' key={index}>
                      <NavLink to={item.path} className={(navClass) => navClass.isActive ? 'nav__activer' : 'nav__link'}>{item.display}</NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="nav__icons">
              <span className='fav__icon'>
                <i className='ri-heart-line'></i>
                <span className='badge'>1</span>
              </span>
              <span className='cart__icon'>
                <i className='ri-shopping-bag-line'></i>
                <span className='badge'>1</span>
              </span>
              <span>
                <motion.img whileTap={{ scale: 1.2 }} src={userIcon} alt="" />
                </span>
            </div>

            <div className="mobile__menu">
              <span>
                <i className='ri-menu-line'></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header