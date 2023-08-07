import React from 'react'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ProductData from './../pages/ProductData';
import CheckOut from './../pages/CheckOut';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import { Routes, Route, Navigate } from 'react-router-dom';

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/shop/:id' element={<ProductData />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<CheckOut />} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default Routers
