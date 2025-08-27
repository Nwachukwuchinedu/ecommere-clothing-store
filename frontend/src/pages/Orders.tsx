import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../lib/api'
import { ProtectedRoute } from '../components/ProtectedRoute'

type Order = { id: string; createdAt: string; subtotal: number; status: string }

const OrdersList: React.FC = () => {
    const { token } = useAuth()
    const [orders, setOrders] = useState<Order[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            setError('')
            try {
                const data = await apiFetch(`/api/orders/mine?page=${page}&limit=10`, {}, token)
                setOrders(data)
            } catch (e) {
                setError('Failed to load your orders')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [page, token])

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>
            {loading && <div className="animate-pulse text-gray-500">Loading…</div>}
            {error && <div className="text-red-600">{error}</div>}
            <div className="bg-white rounded shadow divide-y">
                {orders.map(o => (
                    <div key={o.id} className="p-4 flex items-center justify-between">
                        <div>
                            <div className="font-medium">{new Date(o.createdAt).toLocaleString()}</div>
                            <div className="text-sm text-gray-600">₦{o.subtotal.toLocaleString()}</div>
                        </div>
                        <div className="text-sm">{o.status}</div>
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

const Orders: React.FC = () => (
    <ProtectedRoute>
        <OrdersList />
    </ProtectedRoute>
)

export default Orders


