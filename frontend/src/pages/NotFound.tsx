import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => (
    <div className="max-w-xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-gray-600 mb-6">The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="text-blue-600">Go home</Link>
    </div>
)

export default NotFound


