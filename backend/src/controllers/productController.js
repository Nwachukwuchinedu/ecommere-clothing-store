import { Product } from '../models/Product.js'

export async function listProducts(req, res) {
    const { category, q, minPrice, maxPrice, sort = 'createdAt', order = 'desc', page = 1, limit = 20 } = req.query
    const filter = {}
    if (category) filter.category = category
    if (q) filter.name = new RegExp(q, 'i')
    if (minPrice || maxPrice) filter.price = { ...(minPrice ? { $gte: Number(minPrice) } : {}), ...(maxPrice ? { $lte: Number(maxPrice) } : {}) }
    const products = await Product.find(filter)
        .sort({ [sort]: order === 'asc' ? 1 : -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
    return res.json(products)
}

export async function getProduct(req, res) {
    const p = await Product.findById(req.params.id)
    if (!p) return res.status(404).json({ message: 'Not found' })
    return res.json(p)
}

export async function createProduct(req, res) {
    const p = await Product.create(req.body)
    return res.status(201).json(p)
}

export async function updateProduct(req, res) {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!p) return res.status(404).json({ message: 'Not found' })
    return res.json(p)
}

export async function deleteProduct(req, res) {
    const p = await Product.findByIdAndDelete(req.params.id)
    if (!p) return res.status(404).json({ message: 'Not found' })
    return res.status(204).end()
}


