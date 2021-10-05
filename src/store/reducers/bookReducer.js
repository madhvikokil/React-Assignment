const initState = {
    userList: null,
    bookList: null
}
const bookReducer = (state = initState, action) => {
    // manipulate state
    switch(action.type) {
        case 'GET_USERS_LIST':
        return {
            ...state,
            userList: action.data,
        }

        case 'GET_BOOKS_LIST':
        return {
            ...state,
            bookList: action.data,
        } 

        default:
            return state
    }
}


export default bookReducer;