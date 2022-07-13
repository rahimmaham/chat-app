export default function ({ $axios, $auth }) {
    $axios.onRequest((config) => {
        if ($auth.loggedIn && $auth.getToken('local')) {
            $axios.setToken($auth.getToken('local'))
        }
    })

    $axios.onError(({ response }) => {
        let message =
            'Please check your internet connection or try again later.'

        if (response) {
            if (response.status === 401 && $auth.loggedIn) {
                $auth.logout()
                return
            } else if (
                response.data &&
                response.data.message &&
                !response.data.errors
            ) {
                message = response.data.message
            } else if (
                response.data.errors &&
                response.data.errors[Object.keys(response.data.errors)[0]]
            ) {
                message =
                    response.data.errors[Object.keys(response.data.errors)[0]]
            }
        }
        return Promise.reject(message)
    })
}
