import { login } from './login.action'

module.exports = {
    '/login': {
        post: {
            action: login,
            level: 'public',
        },
    },
}
