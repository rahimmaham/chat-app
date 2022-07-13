const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageModel = new Schema(
    {
        senderId: {
            type: Schema.ObjectId,
            required: true,
        },
        senderName: {
            type: String,
        },
        receiverId: {
            type: Schema.ObjectId,
            required: true,
        },
        receiverName: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('messages', MessageModel)
