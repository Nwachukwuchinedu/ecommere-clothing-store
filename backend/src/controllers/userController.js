import { User } from '../models/User.js'

export async function listUsers(req, res) {
    const { q = '', page = 1, limit = 20 } = req.query
    const filter = q ? { $or: [{ fullName: new RegExp(q, 'i') }, { email: new RegExp(q, 'i') }] } : {}
    const users = await User.find(filter)
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .sort({ createdAt: -1 })
    return res.json(users.map(u => ({ id: u.id, fullName: u.fullName, email: u.email, phone: u.phone, role: u.role, status: u.status })))
}

export async function getUser(req, res) {
    const u = await User.findById(req.params.id)
    if (!u) return res.status(404).json({ message: 'Not found' })
    return res.json({ id: u.id, fullName: u.fullName, email: u.email, phone: u.phone, role: u.role, status: u.status })
}

export async function updateUser(req, res) {
    const { role, status } = req.body
    const u = await User.findByIdAndUpdate(req.params.id, { role, status }, { new: true })
    if (!u) return res.status(404).json({ message: 'Not found' })
    return res.json({ id: u.id, fullName: u.fullName, email: u.email, role: u.role, status: u.status })
}


