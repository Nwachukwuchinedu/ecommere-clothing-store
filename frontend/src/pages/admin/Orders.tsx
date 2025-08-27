import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { apiFetch } from '../../lib/api'

type Order = { id: string; createdAt: string; subtotal: number; status: string }

const Orders: React.FC = () => {
    const { token } = useAuth()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const load = async () => {
        setLoading(true)
        setError('')
        try {
            const data = await apiFetch('/api/orders', {}, token)
            setOrders(data)
        } catch (e) {
            setError('Failed to load orders')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

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
            <div className="bg-white rounded shadow divide-y">
                {orders.map(o => (
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
        </div>
    )
}

export default Orders


