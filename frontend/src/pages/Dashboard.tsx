import React from 'react'
import { useAuth } from '../context/AuthContext'

const Dashboard: React.FC = () => {
    const { user } = useAuth()
    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Welcome, {user?.fullName}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="/shop" className="p-4 bg-white rounded shadow hover:shadow-md transition">Continue Shopping</a>
                <a href="/admin/orders" className="p-4 bg-white rounded shadow hover:shadow-md transition">Your Orders</a>
                <a href="/contact" className="p-4 bg-white rounded shadow hover:shadow-md transition">Support</a>
            </div>
        </div>
    )
}

export default Dashboard


