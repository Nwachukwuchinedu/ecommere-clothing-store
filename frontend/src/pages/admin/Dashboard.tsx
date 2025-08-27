import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { apiFetch } from '../../lib/api'

const Dashboard: React.FC = () => {
    const { token } = useAuth()
    const [summary, setSummary] = useState<{ totalOrders: number; revenue: number } | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            setError('')
            try {
                const data = await apiFetch('/api/analytics/summary', {}, token)
                setSummary(data)
            } catch (e) {
                setError('Failed to load analytics')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [token])

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
            {loading && <div>Loading…</div>}
            {error && <div className="text-red-600">{error}</div>}
            {summary && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded shadow">
                        <div className="text-gray-600 text-sm">Total Orders</div>
                        <div className="text-2xl font-bold">{summary.totalOrders}</div>
                    </div>
                    <div className="p-4 bg-white rounded shadow">
                        <div className="text-gray-600 text-sm">Revenue</div>
                        <div className="text-2xl font-bold">₦{summary.revenue.toLocaleString()}</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard


