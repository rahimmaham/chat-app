import MessageModel from '../../models/Message'

export const get = async (request, response) => {
    const { id } = request.user
    const messages = await MessageModel.find({
        $or: [
            {
                receiverId: id,
                senderId: request.query.userId,
            },
            {
                receiverId: request.query.userId,
                senderId: id,
            },
        ],
    })

    return response.json({
        data: messages,
    })
}
