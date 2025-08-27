import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { apiFetch } from '../../lib/api'

type Product = { _id?: string; id?: string; name: string; price: number; category: string; imageUrl?: string; description?: string }

const Products: React.FC = () => {
    const { token } = useAuth()
    const [items, setItems] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [draft, setDraft] = useState<Product>({ name: '', price: 0, category: '' })

    const load = async () => {
        setLoading(true)
        setError('')
        try {
            const data = await apiFetch('/api/products', {}, token)
            setItems(data)
        } catch (e) {
            setError('Failed to load products')
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => { load() }, [])

    const create = async () => {
        try {
            await apiFetch('/api/products', { method: 'POST', body: JSON.stringify(draft) }, token)
            setDraft({ name: '', price: 0, category: '' })
            load()
        } catch {
            alert('Create failed')
        }
    }

    const update = async (id: string, patch: Partial<Product>) => {
        try { await apiFetch(`/api/products/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }, token); load() } catch { alert('Update failed') }
    }
    const remove = async (id: string) => {
        if (!confirm('Delete product?')) return
        try { await apiFetch(`/api/products/${id}`, { method: 'DELETE' }, token); load() } catch { alert('Delete failed') }
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Products</h1>
            <div className="bg-white p-4 rounded shadow space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input placeholder="Name" className="border rounded px-3 py-2" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} />
                    <input placeholder="Price (NGN)" type="number" className="border rounded px-3 py-2" value={draft.price} onChange={e => setDraft({ ...draft, price: Number(e.target.value) })} />
                    <input placeholder="Category" className="border rounded px-3 py-2" value={draft.category} onChange={e => setDraft({ ...draft, category: e.target.value })} />
                    <button onClick={create} className="bg-blue-600 text-white rounded px-4">Add Product</button>
                </div>
            </div>
            {loading && <div>Loading…</div>}
            {error && <div className="text-red-600">{error}</div>}
            <div className="bg-white rounded shadow divide-y">
                {items.map(p => {
                    const id = (p as any).id || (p as any)._id
                    return (
                        <div key={id} className="p-4 grid grid-cols-1 md:grid-cols-6 gap-3 items-center">
                            <input className="border rounded px-2 py-1 md:col-span-2" value={p.name} onChange={e => update(id, { name: e.target.value })} />
                            <input type="number" className="border rounded px-2 py-1" value={p.price} onChange={e => update(id, { price: Number(e.target.value) })} />
                            <input className="border rounded px-2 py-1" value={p.category} onChange={e => update(id, { category: e.target.value })} />
                            <div className="text-right">
                                <button onClick={() => remove(id)} className="text-red-600">Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Products


