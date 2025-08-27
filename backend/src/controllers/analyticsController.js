import { Order } from '../models/Order.js'

export async function summary(req, res) {
    const [counts] = await Order.aggregate([{ $group: { _id: null, totalOrders: { $sum: 1 }, revenue: { $sum: '$subtotal' } } }])
    return res.json({ totalOrders: counts?.totalOrders || 0, revenue: counts?.revenue || 0 })
}

export async function weekly(req, res) {
    const since = new Date()
    since.setDate(since.getDate() - 7 * 8)
    const data = await Order.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: { $isoWeek: '$createdAt' }, count: { $sum: 1 }, revenue: { $sum: '$subtotal' } } },
        { $sort: { '_id': 1 } }
    ])
    return res.json(data)
}

export async function monthly(req, res) {
    const since = new Date()
    since.setMonth(since.getMonth() - 11)
    const data = await Order.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 }, revenue: { $sum: '$subtotal' } } },
        { $sort: { '_id': 1 } }
    ])
    return res.json(data)
}


