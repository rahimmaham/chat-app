import { get } from './get.action'

import authenticate from '../../middlewares/authenticateUser'

module.exports = {
    '/': {
        get: {
            middlewares: [authenticate],
            action: get,
            level: 'private',
        },
    },
}
