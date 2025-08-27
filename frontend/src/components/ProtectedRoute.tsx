import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoute: React.FC<{ children: React.ReactElement; adminOnly?: boolean }> = ({ children, adminOnly }) => {
    const { user } = useAuth()
    const location = useLocation()
    if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />
    if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />
    return children
}


