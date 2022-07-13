import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Token = new Schema({
    userId: {
        type: Schema.ObjectId,
    },
    revokedAt: {
        type: Date,
        default: null,
    },
    expiresAt: {
        type: Date,
    },
})

export default mongoose.model('tokens', Token)
