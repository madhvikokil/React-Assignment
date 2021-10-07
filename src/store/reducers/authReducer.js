const initState = {
    authError: false,
    authErrorDescription: null,
    isAuthenticated:  false,
}
const authReducer = (state = initState, action) => {
    // manipulate state
    switch(action.type) {
        case 'LOGIN_SUCCESS': 
        return {
            ...state,
            isAuthenticated: true,
            authError: false,
        } 

        case 'LOGIN_ERROR':

        return {
            ...state,
            authError: true,
            authErrorDescription: action.err.message
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

        case 'LOGOUT_SUCCESS':

        return {
            ...state,
            authError: null
        }

        default:
            return state
    }
}

export default authReducer;