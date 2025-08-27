import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export async function signup(req, res) {
    try {
        const { fullName, email, password, phone, address } = req.body
        const existing = await User.findOne({ email })
        if (existing) return res.status(409).json({ message: 'Email already in use' })
        const passwordHash = await bcrypt.hash(password, 10)
        const user = await User.create({ fullName, email, passwordHash, phone, address })
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(201).json({ token, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } })
    } catch (e) {
        return res.status(400).json({ message: 'Unable to signup' })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ message: 'Invalid credentials' })
        const ok = await bcrypt.compare(password, user.passwordHash)
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.json({ token, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } })
    } catch (e) {
        return res.status(400).json({ message: 'Unable to login' })
    }
}


