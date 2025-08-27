import { Order } from '../models/Order.js'
import { User } from '../models/User.js'
import nodemailer from 'nodemailer'

export async function createOrder(req, res) {
    const { items, subtotal } = req.body
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ message: 'No items' })
    const user = await User.findById(req.user.id)
    const order = await Order.create({
        userId: req.user.id,
        items,
        subtotal,
        status: 'pending',
        contactSnapshot: {
            fullName: user?.fullName,
            email: user?.email,
            phone: user?.phone,
            address: user?.address
        }
    })
    try {
        const port = Number(process.env.SMTP_PORT)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port,
            secure: port === 465,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        })
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `New Order ${order.id}`,
            text: `New order placed. Subtotal: ₦${order.subtotal}. User: ${user?.fullName} (${user?.email}).`
        })
    } catch (e) {
        console.error('Email send failed', e)
    }
    return res.status(201).json({ id: order.id })
}

export async function listOrders(req, res) {
    const { status, startDate, endDate, userId, page = 1, limit = 20 } = req.query
    const filter = {}
    if (status) filter.status = status
    if (userId) filter.userId = userId
    if (startDate || endDate) filter.createdAt = { ...(startDate ? { $gte: new Date(startDate) } : {}), ...(endDate ? { $lte: new Date(endDate) } : {}) }
    const orders = await Order.find(filter)
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
    return res.json(orders)
}

export async function getOrder(req, res) {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Not found' })
    if (String(order.userId) !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
    return res.json(order)
}

export async function updateOrderStatus(req, res) {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!order) return res.status(404).json({ message: 'Not found' })
    return res.json(order)
}


