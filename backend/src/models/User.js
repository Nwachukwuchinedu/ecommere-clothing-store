import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema(
    {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        country: { type: String, default: 'Nigeria' }
    },
    { _id: false }
)

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        passwordHash: { type: String, required: true },
        phone: { type: String, default: '' },
        address: { type: addressSchema, default: () => ({}) },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        status: { type: String, enum: ['active', 'disabled'], default: 'active' }
    },
    { timestamps: true }
)

export const User = mongoose.model('User', userSchema)


