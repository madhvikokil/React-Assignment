const initState = {
    authError: null
}
const authReducer = (state = initState, action) => {
    // manipulate state
    switch(action.type) {
        case 'LOGIN_SUCCESS': 
        return {
            ...state,
            authError: 'Login Success!!! Redirecting to Dashboard Page...'
        } 

        case 'LOGIN_ERROR':

        return {
            ...state,
            authError: action.err.message
        }

        case 'SIGNUP_SUCCESS':

        return {
            ...state,
            authError: 'Signup Success'
        }

        case 'SIGNUP_ERROR':

        return {
            ...state,
            authError: action.err.message
        }

        default:
            return state
    }
}

export default authReducer;