import AccessTokenModel from './models/Token'
import UserModel from './models/User'
import MessageModel from './models/Message'
import jwt from 'jsonwebtoken'
import redis from 'socket.io-redis'

/**
 *
 * @param {*} io
 */
async function socket(io) {
    io.adapter(
        redis({
            port: process.env.REDIS_PORT || '6379',
            host: process.env.REDIS_HOST || 'localhost',
            password: process.env.REDIS_PASSWORD || undefined,
        })
    )

    io.use(async function(socket, next) {
        try {
            /* eslint-disable-next-line */
            console.log(socket.handshake)
            if (socket.handshake.query?.token) {
                const { token } = socket.handshake.query

                /*  verify token with secret */
                const payload = await jwt.verify(
                    token.replace('Bearer ', ''),
                    process.env.CLIENT_SECRET
                )

                /* fetch access token form database */
                const accessToken = await AccessTokenModel.findOne({
                    _id: payload.accessTokenId,
                })

                /* return in case of token not found or has been revoked */
                if (!accessToken || accessToken.revokedAt) {
                    return next(new Error('Unauthorized'))
                }

                /* fetch user details form database */
                const user = await UserModel.findOne({
                    _id: payload.userId,
                })

                socket['_user'] = user
                socket['accessTokenModelId'] = accessToken._id
                return next()
            }
            return next(new Error('Unauthorized'))
        } catch (error) {
            return next(new Error(error))
        }
    }).on('connect', async (socket) => {
        socket.join(socket._user._id)
        /* eslint-disable-next-line */
        console.log('Socket connected successfully.')

        socket.on('disconnect', async () => {
            /* eslint-disable-next-line */
            console.log('Socket disconnected.')
            socket.leave(socket._user._id)
        })

        socket.on('sendMessage', async (message) => {
            await MessageModel.create(message)
            await socket.broadcast.emit('receiveMessage', message)
        })

        socket.on('leaveRoom', async function() {
            /* eslint-disable-next-line */
            console.log('Socket disconnected.')
            socket.leave(socket._user._id)
        })
    })
}
const signaling = function(app) {
    const http = require('http').createServer(app)
    const io = require('socket.io')(http, {
        cookie: false,
        serveClient: false,
        transports: ['websocket'],
    })

    socket(io)
    return http
}

module.exports = signaling
