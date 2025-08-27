import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { apiFetch } from '../../lib/api'

type User = { id: string; fullName: string; email: string; phone?: string; role: string; status: string }

const Users: React.FC = () => {
    const { token } = useAuth()
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const load = async () => {
        setLoading(true)
        setError('')
        try {
            const data = await apiFetch('/api/users', {}, token)
            setUsers(data)
        } catch (e) {
            setError('Failed to load users')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    const update = async (id: string, patch: Partial<User>) => {
        try { await apiFetch(`/api/users/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }, token); load() } catch { alert('Update failed') }
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Users</h1>
            {loading && <div>Loading…</div>}
            {error && <div className="text-red-600">{error}</div>}
            <div className="bg-white rounded shadow divide-y">
                {users.map(u => (
                    <div key={u.id} className="p-4 grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                        <div>
                            <div className="font-medium">{u.fullName}</div>
                            <div className="text-sm text-gray-600">{u.email}</div>
                        </div>
                        <div className="text-sm">{u.phone || '-'}</div>
                        <select className="border rounded px-2 py-1" value={u.role} onChange={(e) => update(u.id, { role: e.target.value })}>
                            {['user', 'admin'].map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                        <select className="border rounded px-2 py-1" value={u.status} onChange={(e) => update(u.id, { status: e.target.value })}>
                            {['active', 'disabled'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <div className="text-right text-sm">ID: {u.id.slice(-6)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Users


