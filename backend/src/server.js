import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { User } from './models/User.js'

import { router as authRouter } from './routes/auth.js'
import { router as usersRouter } from './routes/users.js'
import { router as productsRouter } from './routes/products.js'
import { router as ordersRouter } from './routes/orders.js'
import { router as analyticsRouter } from './routes/analytics.js'

dotenv.config()

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/analytics', analyticsRouter)

const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI

mongoose
    .connect(MONGO_URI)
    .then(async () => {
        // Optional admin bootstrap
        if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
            const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL })
            if (!existingAdmin) {
                const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
                await User.create({
                    fullName: process.env.ADMIN_NAME || 'MiraHub Admin',
                    email: process.env.ADMIN_EMAIL,
                    passwordHash,
                    phone: process.env.ADMIN_PHONE || '',
                    address: { street: '', city: '', state: '', country: 'Nigeria' },
                    role: 'admin',
                    status: 'active'
                })
                console.log('Admin user created from environment variables')
            }
        }
        app.listen(PORT, () => {
            console.log(`API listening on :${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Mongo connection error', err)
        process.exit(1)
    })