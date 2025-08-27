import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { apiFetch } from '../../lib/api'

type Order = { id: string; createdAt: string; subtotal: number; status: string }

const Orders: React.FC = () => {
    const { token } = useAuth()
    const [orders, setOrders] = useState<Order[]>([])
    const [q, setQ] = useState('')
    const [status, setStatus] = useState('')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const load = async () => {
        setLoading(true)
        setError('')
        try {
            const params = new URLSearchParams()
            if (status) params.set('status', status)
            params.set('page', String(page))
            params.set('limit', '10')
            const data = await apiFetch(`/api/orders?${params.toString()}`, {}, token)
            setOrders(data)
        } catch (e) {
            setError('Failed to load orders')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [status, page])

    const updateStatus = async (id: string, status: string) => {
        try {
            await apiFetch(`/api/orders/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }, token)
            await load()
        } catch (e) {
            alert('Failed to update status')
        }
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Orders</h1>
            {loading && <div>Loading…</div>}
            {error && <div className="text-red-600">{error}</div>}
            <div className="flex items-center gap-3 mb-4">
                <input placeholder="Search (client-side)" className="border rounded px-3 py-2" value={q} onChange={e => setQ(e.target.value)} />
                <select className="border rounded px-3 py-2" value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="">All statuses</option>
                    {['pending', 'processing', 'completed', 'cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
            <div className="bg-white rounded shadow divide-y">
                {orders.filter(o => q ? o.id.includes(q) : true).map(o => (
                    <div key={o.id} className="p-4 flex items-center justify-between">
                        <div>
                            <div className="font-medium">{new Date(o.createdAt).toLocaleString()}</div>
                            <div className="text-sm text-gray-600">₦{o.subtotal.toLocaleString()}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm">{o.status}</span>
                            <select className="border rounded px-2 py-1" value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}>
                                {['pending', 'processing', 'completed', 'cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between mt-4">
                <button className="px-3 py-1 border rounded disabled:opacity-50" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
                <span className="text-sm">Page {page}</span>
                <button className="px-3 py-1 border rounded" onClick={() => setPage(p => p + 1)}>Next</button>
            </div>
        </div>
    )
}

export default Orders


