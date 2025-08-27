import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        priceAtOrder: { type: Number, required: true }
    },
    { _id: false }
)

const contactSnapshotSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        phone: String,
        address: {
            street: String,
            city: String,
            state: String,
            country: { type: String, default: 'Nigeria' }
        }
    },
    { _id: false }
)

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: { type: [orderItemSchema], required: true },
        subtotal: { type: Number, required: true },
        status: { type: String, enum: ['pending', 'processing', 'completed', 'cancelled'], default: 'pending' },
        contactSnapshot: { type: contactSnapshotSchema }
    },
    { timestamps: true }
)

export const Order = mongoose.model('Order', orderSchema)


