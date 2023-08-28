import React, { useRef, useEffect, useState } from 'react'
import './Header.css'
import { motion } from 'framer-motion'

import { Container, Row } from 'reactstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/eco-logo.png'
import userIcon from '../../assets/images/user-icon.png'
import { useSelector } from 'react-redux'
import useAuth from '../../customHoks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'
import { toast } from 'react-toastify'

const nav__links = [
  {
    path: '/',
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

  const totalQuantity = useSelector(state => state.cart.totalQuantity)

  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const profileActionRef = useRef(null)
  const [open, setOpen] = useState(false)

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }

  const logout = () => {

    signOut(auth).then(() => {
      toast.success('Logged out')
      navigate("/")
    }).catch(err => {
      toast.error(err.message)
    })
  }

  useEffect(() => {
    stickyHeaderFunc()

    return () => window.removeEventListener('scroll', stickyHeaderFunc)
  })

  const menuToggle = () => menuRef.current.classList.toggle('activer__menu')

  const navigateToCart = () => {
    navigate('/cart')
  }

  const toggleProfileActions = () => {
    setOpen(!open)

  }

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={Logo} alt="logo" />
              <div>
                <h1>Multimart</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
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
              <span className='cart__icon' onClick={navigateToCart}>
                <i className='ri-shopping-bag-line'></i>
                <span className='badge'>{totalQuantity}</span>
              </span>
              <div className='profile'>
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoUrl : userIcon}
                  alt=""
                  onClick={toggleProfileActions}
                />
                <div className={open === true ? 'profile__actions activer' : 'profile__actions'}
                  ref={profileActionRef}
                  onClick={toggleProfileActions}>
                  {currentUser ? (
                    <span className={open === true ? 'text__activer' : 'text'} onClick={logout}>Logout</span>
                  ) : (
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                      <Link className={open === true ? 'text__activer' : 'text'} to='/signup'>Signup</Link>
                      <Link className={open === true ? 'text__activer' : 'text'} to='/login'>Login</Link>
                      <Link className={open === true ? 'text__activer' : 'text'} to='/dashboard'>Dashboard</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className='ri-menu-line'></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header
