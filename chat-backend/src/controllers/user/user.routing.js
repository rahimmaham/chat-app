import { create } from './create.action'
import { get } from './get.action'
import { me } from './me.action'

import authenticate from '../../middlewares/authenticateUser'

module.exports = {
    '/register': {
        post: {
            action: create,
            level: 'public',
        },
    },
    '/': {
        get: {
            middlewares: [authenticate],
            action: get,
            level: 'private',
        },
    },
    '/me': {
        get: {
            middlewares: [authenticate],
            action: me,
            level: 'private',
        },
    },
}
