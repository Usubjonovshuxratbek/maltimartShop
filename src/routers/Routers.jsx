import React from 'react'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ProductDetails from './../pages/ProductDetails';
import CheckOut from './../pages/CheckOut';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AddProducts from '../admin/AddProducts';
import AllProducts from '../admin/AllProducts'
import Dashboard from '../admin/Dashboard';
import Users from '../admin/Users';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/shop/:id' element={<ProductDetails />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/*' element={<ProtectedRoute />}>
        <Route path='checkout' element={<CheckOut />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='dashboard/all-products' element={<AllProducts />} />
        <Route path='dashboard/add-products' element={<AddProducts />} />
        <Route path='dashboard/users' element={<Users />} />
      </Route>
      <Route path='/checkout' element={<ProtectedRoute>
        <CheckOut />
      </ProtectedRoute>} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default Routers
