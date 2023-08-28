import React from 'react'
import useAuth from '../customHoks/useAuth'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function ProtectedRoute() {

    const { currentUser } = useAuth()

  return currentUser ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute