import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type User = { id: string; fullName: string; email: string; role: 'user' | 'admin' }

type AuthContextType = {
    user: User | null
    token: string | null
    login: (email: string, password: string) => Promise<void>
    signup: (data: { fullName: string; email: string; password: string; phone?: string; address?: any }) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_URL = import.meta.env.VITE_API_URL as string

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const saved = localStorage.getItem('auth')
        if (saved) {
            const parsed = JSON.parse(saved)
            setToken(parsed.token)
            setUser(parsed.user)
        }
    }, [])

    const persist = (t: string, u: User) => {
        setToken(t)
        setUser(u)
        localStorage.setItem('auth', JSON.stringify({ token: t, user: u }))
    }

    const login = async (email: string, password: string) => {
        const res = await fetch(`${API_URL}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
        if (!res.ok) throw new Error('Login failed')
        const data = await res.json()
        persist(data.token, data.user)
    }

    const signup = async (payload: { fullName: string; email: string; password: string; phone?: string; address?: any }) => {
        const res = await fetch(`${API_URL}/api/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (!res.ok) throw new Error('Signup failed')
        const data = await res.json()
        persist(data.token, data.user)
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('auth')
    }

    const value = useMemo(() => ({ user, token, login, signup, logout }), [user, token])
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}


