import Vue from 'vue'
import SocketIO from 'socket.io-client'
import VueSocketio from 'vue-socket.io'

export default async function ({ $auth }, inject) {
    const options = {
        reconnection: false,
        connectManually: true,
        transports: ['websocket'],
        reconnectionAttempts: 100,
        reconnectionDelay: 500,
        reconnectionDelayMax: 1000,
        timeout: 1000,
        autoConnect: false,
        format: 'json',
    }

    const host = `${process.env.NUXT_ENV_SOCKET_HOST}?token=${$auth.getToken('local')}`

    const socket = await new VueSocketio({
        debug: false,
        connection: SocketIO(host, options),
    })

    Vue.use(socket)
    inject('socket', socket)
}
