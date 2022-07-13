export default function ({ $auth, redirect, route, error }) {
    if (
         !$auth.user
    ) {
        redirect('/')
    }
}
