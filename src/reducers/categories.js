export default function categories(state = {}, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                loggingIn: true,
                user: action.user
            };
        default:
            return state
    }
}