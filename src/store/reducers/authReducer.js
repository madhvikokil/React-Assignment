const initState = {
    authError: false,
    authErrorDescription: null,
    isSignedUp: false
    // isAuthenticated:  false,
}
const authReducer = (state = initState, action) => {
    // manipulate state
    switch(action.type) {
        case 'LOGIN_SUCCESS': 
        return {
            ...state,
            // isAuthenticated: true,
            authError: false,
            authErrorDescription: 'Login Successfully!!!'
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
            isSignedUp: true,
            authError: 'Signup Success,login to continue...'
        }

        case 'SIGNUP_ERROR':

        return {
            ...state,
            isSignedUp: false,
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