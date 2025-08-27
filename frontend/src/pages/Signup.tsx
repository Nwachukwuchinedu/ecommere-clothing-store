import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const Signup: React.FC = () => {
    const { signup } = useAuth()
    const navigate = useNavigate()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await signup({ fullName, email, password, phone, address: { street, city, state, country: 'Nigeria' } })
            navigate('/')
        } catch (e) {
            setError('Signup failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Create account</h1>
            {error && <div className="text-red-600 mb-3 text-sm">{error}</div>}
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">Full name</label>
                    <input className="w-full border rounded px-3 py-2" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input className="w-full border rounded px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label className="block text-sm mb-1">Phone (+234)</label>
                    <input className="w-full border rounded px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 801 234 5678" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm mb-1">Street</label>
                        <input className="w-full border rounded px-3 py-2" value={street} onChange={(e) => setStreet(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">City</label>
                        <input className="w-full border rounded px-3 py-2" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm mb-1">State</label>
                        <input className="w-full border rounded px-3 py-2" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <input className="w-full border rounded px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                    </div>
                </div>
                <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60">{loading ? 'Creating…' : 'Sign up'}</button>
            </form>
            <p className="text-sm text-gray-600 mt-4">Have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
        </div>
    )
}

export default Signup


