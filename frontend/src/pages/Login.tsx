import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation, Link } from 'react-router-dom'

const Login: React.FC = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation() as any
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(email, password)
            const redirectTo = location.state?.from || '/dashboard'
            navigate(redirectTo, { replace: true })
        } catch (e) {
            setError('Invalid email or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Login</h1>
            {error && <div className="text-red-600 mb-3 text-sm">{error}</div>}
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input className="w-full border rounded px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label className="block text-sm mb-1">Password</label>
                    <input className="w-full border rounded px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60">{loading ? 'Signing in…' : 'Login'}</button>
            </form>
            <p className="text-sm text-gray-600 mt-4">No account? <Link to="/signup" className="text-blue-600">Sign up</Link></p>
        </div>
    )
}

export default Login


