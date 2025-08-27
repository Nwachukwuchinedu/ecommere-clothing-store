import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import { Product } from '../models/Product.js'

const MONGO_URI = process.env.MONGO_URI

async function run() {
    await mongoose.connect(MONGO_URI)
    const categories = ['shirts', 'pants', 'dresses', 'shoes', 'accessories']
    const docs = Array.from({ length: 30 }).map(() => ({
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price({ min: 3000, max: 80000 })),
        category: faker.helpers.arrayElement(categories),
        imageUrl: `https://picsum.photos/seed/${faker.string.uuid()}/600/600`,
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ min: 0, max: 100 })
    }))
    await Product.deleteMany({})
    await Product.insertMany(docs)
    console.log('Seeded products:', docs.length)
    await mongoose.disconnect()
}

run().catch((e) => { console.error(e); process.exit(1) })


