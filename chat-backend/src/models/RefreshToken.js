import mongoose from 'mongoose'

const Schema = mongoose.Schema

const RefreshToken = new Schema({
    accessTokenId: {
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

export default mongoose.model('refreshTokens', RefreshToken)
