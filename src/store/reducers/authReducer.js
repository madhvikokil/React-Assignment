const initState = {
    authError: null
}
const authReducer = (state = initState, action) => {
    // manipulate state
    switch(action.type) {
        case 'LOGIN_SUCCESS': 
        console.log("Login Success");
        return {
            ...state,
            authError: 'Login Success!!! Redirecting to Dashboard Page...'
        } 

        case 'LOGIN_ERROR':
        console.log("Login Error");

        return {
            ...state,
            authError: 'Login Failed'
        }

        default:
            return state
    }
}

export default authReducer;